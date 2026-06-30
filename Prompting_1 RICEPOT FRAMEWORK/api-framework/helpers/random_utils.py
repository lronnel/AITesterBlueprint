from __future__ import annotations

from datetime import datetime, timedelta
from uuid import uuid4

from faker import Faker


class RandomUtils:
    """Generate random data for payloads and test data."""

    fake = Faker()

    @classmethod
    def email(cls) -> str:
        return cls.fake.email()

    @classmethod
    def name(cls) -> str:
        return cls.fake.name()

    @classmethod
    def uuid(cls) -> str:
        return str(uuid4())

    @classmethod
    def future_date(cls, days: int = 7) -> str:
        return (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")

    @classmethod
    def past_date(cls, days: int = 7) -> str:
        return (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
