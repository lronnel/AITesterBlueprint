from __future__ import annotations

from typing import Any

import requests
from tenacity import retry, stop_after_attempt, wait_fixed

from utilities.config_reader import ConfigReader
from utilities.logger import get_logger


class APIClient:
    """Reusable HTTP client for REST API testing."""

    def __init__(self, config_reader: ConfigReader, logger: Any | None = None) -> None:
        self.config = config_reader
        self.logger = logger or get_logger("api_client")
        self.session = requests.Session()

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(1), reraise=True)
    def request(
        self,
        method: str,
        endpoint: str,
        *,
        headers: dict[str, str] | None = None,
        params: dict[str, Any] | None = None,
        json: Any = None,
        data: Any = None,
        files: dict[str, Any] | None = None,
        auth: Any = None,
        timeout: int | None = None,
        verify_ssl: bool | None = None,
        **kwargs: Any,
    ) -> requests.Response:
        url = self._build_url(endpoint)
        timeout_value = timeout or self.config.timeout
        verify_value = self.config.verify_ssl if verify_ssl is None else verify_ssl

        self.logger.info("Request: %s %s", method.upper(), url)
        self.logger.info("Headers: %s", headers)
        self.logger.info("Body: %s", json or data)

        response = self.session.request(
            method=method.upper(),
            url=url,
            headers=headers,
            params=params,
            json=json,
            data=data,
            files=files,
            auth=auth,
            timeout=timeout_value,
            verify=verify_value,
            **kwargs,
        )

        self.logger.info("Response: %s %s", response.status_code, response.text)
        return response

    def get(self, endpoint: str, **kwargs: Any) -> requests.Response:
        return self.request("GET", endpoint, **kwargs)

    def post(self, endpoint: str, **kwargs: Any) -> requests.Response:
        return self.request("POST", endpoint, **kwargs)

    def put(self, endpoint: str, **kwargs: Any) -> requests.Response:
        return self.request("PUT", endpoint, **kwargs)

    def patch(self, endpoint: str, **kwargs: Any) -> requests.Response:
        return self.request("PATCH", endpoint, **kwargs)

    def delete(self, endpoint: str, **kwargs: Any) -> requests.Response:
        return self.request("DELETE", endpoint, **kwargs)

    def _build_url(self, endpoint: str) -> str:
        base_url = self.config.base_url.rstrip("/")
        endpoint = endpoint.lstrip("/")
        return f"{base_url}/{endpoint}" if endpoint else base_url
