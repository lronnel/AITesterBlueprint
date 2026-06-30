from __future__ import annotations

from typing import Any

from jsonschema import validate


class ResponseValidator:
    """Validate common API response fields."""

    @staticmethod
    def validate_status_code(response: Any, expected_code: int) -> None:
        assert response.status_code == expected_code

    @staticmethod
    def validate_response_time(response: Any, threshold_ms: int) -> None:
        elapsed_ms = getattr(response, "elapsed", None)
        if elapsed_ms is None:
            return
        assert elapsed_ms.total_seconds() * 1000 <= threshold_ms

    @staticmethod
    def validate_json_schema(response: Any, schema: dict[str, Any]) -> None:
        payload = response.json()
        validate(instance=payload, schema=schema)

    @staticmethod
    def validate_content_type(response: Any, expected: str) -> None:
        assert expected in response.headers.get("Content-Type", "")
