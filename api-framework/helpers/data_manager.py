from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

import pandas as pd
import yaml


class DataManager:
    """Utility manager for JSON, YAML, CSV, and Excel files."""

    @staticmethod
    def read_json(file_path: str | Path) -> Any:
        with open(file_path, "r", encoding="utf-8") as handle:
            return json.load(handle)

    @staticmethod
    def read_yaml(file_path: str | Path) -> Any:
        with open(file_path, "r", encoding="utf-8") as handle:
            return yaml.safe_load(handle)

    @staticmethod
    def read_csv(file_path: str | Path) -> list[dict[str, str]]:
        with open(file_path, "r", encoding="utf-8", newline="") as handle:
            return list(csv.DictReader(handle))

    @staticmethod
    def read_excel(file_path: str | Path) -> pd.DataFrame:
        return pd.read_excel(file_path)
