import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings, DB_DIR

logger = logging.getLogger("nexus.database")

def create_resilient_engine():
    db_url = settings.DATABASE_URL
    if "postgresql" in db_url:
        try:
            # Test direct connection
            eng = create_engine(db_url, pool_pre_ping=True)
            with eng.connect() as conn:
                pass
            print(f"[DB INFO] Connected successfully to PostgreSQL Neon DB.")
            return eng
        except Exception as e:
            print(f"[DB WARNING] Could not connect to PostgreSQL ({e}). Falling back to SQLite database at {DB_DIR / 'nexus.db'}")
            fallback_url = f"sqlite:///{DB_DIR / 'nexus.db'}"
            return create_engine(fallback_url, connect_args={"check_same_thread": False})
    else:
        return create_engine(
            db_url,
            connect_args={"check_same_thread": False} if "sqlite" in db_url else {}
        )

engine = create_resilient_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

