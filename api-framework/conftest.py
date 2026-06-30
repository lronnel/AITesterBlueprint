import os
from pathlib import Path

import pytest
from dotenv import load_dotenv

from utilities.config_reader import ConfigReader
from utilities.logger import get_logger
from utilities.api_client import APIClient


load_dotenv(Path(__file__).resolve().parent / ".env")


@pytest.fixture(scope="session")
def config_reader():
    return ConfigReader()


@pytest.fixture(scope="session")
def api_client(config_reader):
    logger = get_logger("api_framework")
    return APIClient(config_reader=config_reader, logger=logger)
