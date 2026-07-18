import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    
    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY"
    )
    
    CHAT_RATE_LIMIT = os.getenv(
    "CHAT_RATE_LIMIT",
    "10/minute"
    )
    LOG_LEVEL = os.getenv(
    "LOG_LEVEL",
    "INFO"
    ).upper()

    APP_NAME = os.getenv(
        "APP_NAME",
        "Personal AI Portfolio Assistant"
    )

    ENVIRONMENT = os.getenv(
        "ENVIRONMENT",
        "development"
    )

    FRONTEND_URL = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )

    MAX_MESSAGE_LENGTH = int(
        os.getenv(
            "MAX_MESSAGE_LENGTH",
            "1000"
        )
    )

    FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

MAX_MESSAGE_LENGTH = int(
    os.getenv(
        "MAX_MESSAGE_LENGTH",
        "1000"
    )
)

@property
def allowed_origins(self):
    origins = [
        self.FRONTEND_URL,
        "https://sivapothula.in",
        "https://www.sivapothula.in",
    ]

    if self.ENVIRONMENT == "development":
        development_origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]

        for origin in development_origins:
            if origin not in origins:
                origins.append(origin)

    return list(set(origins))