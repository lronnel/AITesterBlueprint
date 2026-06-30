from __future__ import annotations

from typing import Any


class AuthManager:
    """Centralized helpers for common authentication schemes."""

    @staticmethod
    def basic(username: str, password: str) -> tuple[str, str]:
        return username, password

    @staticmethod
    def bearer(token: str) -> dict[str, str]:
        return {"Authorization": f"Bearer {token}"}

    @staticmethod
    def jwt(token: str) -> dict[str, str]:
        return {"Authorization": f"JWT {token}"}

    @staticmethod
    def api_key(key: str, value: str, location: str = "header") -> dict[str, str]:
        if location == "header":
            return {key: value}
        return {"query": value}

    @staticmethod
    def custom_header(name: str, value: str) -> dict[str, str]:
        return {name: value}

    @staticmethod
    def oauth2(access_token: str) -> dict[str, str]:
        return {"Authorization": f"Bearer {access_token}"}
