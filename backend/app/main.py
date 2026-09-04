from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.database import SessionLocal, Base, engine
from backend.app.api.routes import router as api_router
from backend.app.services.data_generator import seed_database
from backend.app.models.db_models import Product

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="NEXUS: AI-driven autonomous operational decision system and multi-agent coordination layer.",
)

# Enable CORS for local React/Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def on_startup():
    """Ensure database schema is created and seeded with baseline company data."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        product_count = db.query(Product).count()
        if product_count == 0:
            print("[INFO] First run detected: Seeding database with TechMart company records...")
            seed_database()
        else:
            print(f"[INFO] TechMart database verified ({product_count} products loaded).")
    finally:
        db.close()

@app.get("/")
def root():
    return {
        "system": settings.PROJECT_NAME,
        "status": "active",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
    }
