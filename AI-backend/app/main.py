from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.chat import (
    limiter,
    router as chat_router
)
from app.core.config import settings


logging.basicConfig(
    level=getattr(
        logging,
        settings.LOG_LEVEL,
        logging.INFO
    ),
    format=(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s | "
        "%(message)s"
    )
)


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Backend API for Pothula Siva Anand's "
        "Personal AI Portfolio Assistant."
    ),
    version="1.0.0"
)


app.state.limiter = limiter


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST"
    ],
    allow_headers=[
        "Content-Type"
    ],
)


app.include_router(
    chat_router
)


@app.get("/")
def root():

    return {
        "message": (
            "Personal AI Portfolio Assistant "
            "API is running."
        )
    }


@app.get("/api/health")
def health_check():

    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.ENVIRONMENT
    }