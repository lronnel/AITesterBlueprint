from __future__ import annotations

from helpers.random_utils import RandomUtils


class UserPayloadBuilder:
    """Build user payloads for sample API tests."""

    @staticmethod
    def create_user_payload() -> dict[str, str]:
        return {
            "name": RandomUtils.name(),
            "job": "QA Engineer",
        }

    @staticmethod
    def update_user_payload() -> dict[str, str]:
        return {
            "name": RandomUtils.name(),
            "job": "Senior QA Engineer",
        }
