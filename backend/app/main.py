from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.score import router as score_router

app = FastAPI(
    title="AI Retrieval Intelligence Engine",
    description="Deterministic Citation Likelihood Scoring System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(score_router, prefix="/api")
