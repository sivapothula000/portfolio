from pathlib import Path

import chromadb

from app.rag.knowledge_loader import load_knowledge
from app.services.embedding_service import EmbeddingService


BACKEND_ROOT = Path(__file__).resolve().parents[2]
CHROMA_PATH = BACKEND_ROOT / "chroma_db"

COLLECTION_NAME = "portfolio_knowledge"


def ingest_knowledge():

    print("Loading knowledge base...")

    documents = load_knowledge()

    print(
        f"Loaded {len(documents)} "
        "knowledge documents."
    )

    print("Connecting to Gemini Embedding API...")

    embedding_service = EmbeddingService()

    print("Connecting to ChromaDB...")

    client = chromadb.PersistentClient(
        path=str(CHROMA_PATH)
    )

    try:
        client.delete_collection(
            name=COLLECTION_NAME
        )
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION_NAME,
        metadata={
            "hnsw:space": "cosine"
        }
    )

    texts = []
    metadatas = []
    ids = []
    embeddings = []

    print("Generating Gemini embeddings...")

    for index, document in enumerate(documents):

        text = document["text"]

        embedding = (
            embedding_service.embed_document(
                text
            )
        )

        texts.append(text)
        metadatas.append(
            document["metadata"]
        )
        ids.append(
            f"knowledge-{index}"
        )
        embeddings.append(
            embedding
        )

        print(
            f"Embedded document "
            f"{index + 1}/{len(documents)}"
        )

    print("Saving vectors to ChromaDB...")

    collection.add(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=embeddings
    )

    print()
    print(
        "Gemini embedding ingestion "
        "completed successfully."
    )
    print(
        f"Documents stored: "
        f"{collection.count()}"
    )
    print(
        f"Vector database: {CHROMA_PATH}"
    )


if __name__ == "__main__":
    ingest_knowledge()