import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env explicitly
load_dotenv()
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
STORAGE_DIR = PROJECT_ROOT / "storage"
DB_DIR = STORAGE_DIR / "db"
DOCS_DIR = STORAGE_DIR / "docs"

DB_DIR.mkdir(parents=True, exist_ok=True)
DOCS_DIR.mkdir(parents=True, exist_ok=True)

class Settings(BaseSettings):
    PROJECT_NAME: str = "NEXUS Agentic Operations System"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{DB_DIR / 'nexus.db'}"
    )
    DOCS_PATH: Path = DOCS_DIR
    
    # Financial governance thresholds
    STATUTORY_CASH_BUFFER: float = 500000.0  # ₹5 Lakhs
    DEFAULT_PROCUREMENT_BUDGET_CAP: float = 180000.0  # ₹1.8 Lakhs

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
