import os
from pathlib import Path
from typing import Any

import yaml
from dotenv import load_dotenv


class ConfigReader:
    """Load configuration from .env and YAML files."""

    def __init__(self, env_file: str | None = None, config_file: str | None = None) -> None:
        base_dir = Path(__file__).resolve().parent.parent
        self.env_file = env_file or str(base_dir / ".env")
        self.config_file = config_file or str(base_dir / "config" / "config.yaml")
        load_dotenv(self.env_file, override=True)
        self.env_name = os.getenv("ENV", "qa")
        self.settings = self._load_yaml_settings()

    def _load_yaml_settings(self) -> dict[str, Any]:
        with open(self.config_file, "r", encoding="utf-8") as handle:
            config = yaml.safe_load(handle) or {}
        return config.get(self.env_name, {})

    def get(self, key: str, default: Any = None) -> Any:
        return os.getenv(key.upper(), self.settings.get(key, default))

    @property
    def base_url(self) -> str:
        return self.get("base_url", "")

    @property
    def timeout(self) -> int:
        return int(self.get("timeout", 10))

    @property
    def verify_ssl(self) -> bool:
        return self.get("verify_ssl", "true").lower() == "true"

    @property
    def retry_count(self) -> int:
        return int(self.get("retry_count", 3))

    @property
    def retry_backoff(self) -> float:
        return float(self.get("retry_backoff", 1.0))
