from google import genai

from app.core.config import settings


EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIMENSION = 768


class EmbeddingService:

    def __init__(self):
        if not settings.GEMINI_API_KEY:
            raise RuntimeError(
        "GEMINI_API_KEY is not configured."
    )

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )


    def embed_document(
        self,
        text: str
    ) -> list[float]:

        result = self.client.models.embed_content(
            model=EMBEDDING_MODEL,
            contents=text,
            config={
                "task_type": "RETRIEVAL_DOCUMENT",
                "output_dimensionality": EMBEDDING_DIMENSION
            }
        )

        return result.embeddings[0].values


    def embed_query(
        self,
        text: str
    ) -> list[float]:

        result = self.client.models.embed_content(
            model=EMBEDDING_MODEL,
            contents=text,
            config={
                "task_type": "RETRIEVAL_QUERY",
                "output_dimensionality": EMBEDDING_DIMENSION
            }
        )

        return result.embeddings[0].values