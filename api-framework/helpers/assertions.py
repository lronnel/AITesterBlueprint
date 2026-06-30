from __future__ import annotations

import re
from typing import Any


class ResponseAssertions:
    """Reusable assertion helpers for API responses."""

    @staticmethod
    def assert_status_code(response: Any, expected_code: int) -> None:
        assert response.status_code == expected_code, f"Expected status {expected_code}, got {response.status_code}"

    @staticmethod
    def assert_contains(response: Any, expected_text: str) -> None:
        assert expected_text in response.text, f"Expected text '{expected_text}' not found"

    @staticmethod
    def assert_json_path(response: Any, path: str, expected: Any) -> None:
        value = response.json()
        current = value
        for part in path.split("."):
            if isinstance(current, dict):
                current = current.get(part)
            else:
                current = None
                break
        assert current == expected, f"Path '{path}' expected {expected}, got {current}"

    @staticmethod
    def assert_regex(response: Any, pattern: str, expected: bool = True) -> None:
        match = re.search(pattern, response.text)
        assert (match is not None) is expected, f"Regex '{pattern}' check failed"

    @staticmethod
    def assert_empty(response: Any) -> None:
        assert response.text == "", "Response body should be empty"
