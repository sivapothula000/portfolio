from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer

from app.rag.knowledge_loader import load_knowledge


BACKEND_ROOT = Path(__file__).resolve().parents[2]
CHROMA_PATH = BACKEND_ROOT / "chroma_db"

COLLECTION_NAME = "portfolio_knowledge"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def ingest_knowledge():

    print("Loading knowledge base...")

    documents = load_knowledge()

    print(f"Loaded {len(documents)} knowledge documents.")

    print("Loading embedding model...")

    model = SentenceTransformer(MODEL_NAME)

    print("Connecting to ChromaDB...")

    client = chromadb.PersistentClient(
        path=str(CHROMA_PATH)
    )

    # Recreate the collection so repeated ingestion does not
    # leave old or duplicate knowledge behind.
    try:
        client.delete_collection(
            name=COLLECTION_NAME
        )
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION_NAME
    )

    texts = []
    metadatas = []
    ids = []

    for index, document in enumerate(documents):

        texts.append(document["text"])
        metadatas.append(document["metadata"])
        ids.append(f"knowledge-{index}")

    print("Generating embeddings...")

    embeddings = model.encode(
        texts,
        normalize_embeddings=True
    ).tolist()

    print("Saving vectors to ChromaDB...")

    collection.add(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=embeddings
    )

    print()
    print("Ingestion completed successfully.")
    print(f"Documents stored: {collection.count()}")
    print(f"Vector database: {CHROMA_PATH}")


if __name__ == "__main__":
    ingest_knowledge()