import pytest
from backend.app.services.data_generator import seed_database

@pytest.fixture(scope="session", autouse=True)
def initialize_database():
    """Ensure test suite starts against a freshly seeded TechMart operational database."""
    seed_database()
