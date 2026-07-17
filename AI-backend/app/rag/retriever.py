from pathlib import Path
import logging

import chromadb
from sentence_transformers import SentenceTransformer


BACKEND_ROOT = Path(__file__).resolve().parents[2]
CHROMA_PATH = BACKEND_ROOT / "chroma_db"

COLLECTION_NAME = "portfolio_knowledge"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
MAX_DISTANCE = 1.30

logger = logging.getLogger(__name__)
class PortfolioRetriever:

    def __init__(self):

        logger.info(
    "Loading portfolio embedding model."
)

        self.model = SentenceTransformer(MODEL_NAME)

        logger.info(
    "Connecting to portfolio vector database."
)

        self.client = chromadb.PersistentClient(
            path=str(CHROMA_PATH)
        )

        try:
            self.collection = self.client.get_collection(
                name=COLLECTION_NAME
            )
        except Exception as error:
            raise RuntimeError(
                "Portfolio knowledge collection was not found. "
                "Run 'python -m app.rag.ingest' first."
            ) from error


    def retrieve(self, query: str, top_k: int = 5):

        if not query or not query.strip():
            raise ValueError(
                "The search query cannot be empty."
            )

        query = query.strip()

        query_embedding = self.model.encode(
            query,
            normalize_embeddings=True
        ).tolist()

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=[
                "documents",
                "metadatas",
                "distances"
            ]
        )

        retrieved_documents = []

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        for document, metadata, distance in zip(
            documents,
            metadatas,
            distances
        ):
            # Ignore results that are too semantically distant
            if distance <= MAX_DISTANCE:
                retrieved_documents.append(
                    {
                        "text": document,
                        "metadata": metadata,
                        "distance": distance
                    }
                )

        return retrieved_documents


if __name__ == "__main__":

    retriever = PortfolioRetriever()

    while True:

        print("\n" + "=" * 60)

        query = input(
            "Ask about Siva (type 'exit' to stop): "
        ).strip()

        if query.lower() == "exit":
            print("Retrieval test stopped.")
            break

        try:

            results = retriever.retrieve(
                query=query,
                top_k=5
            )

            # Handle queries with no relevant knowledge
            if not results:

                print(
                    "\nNo relevant information was found "
                    "in Siva's knowledge base."
                )

            else:

                print("\nRetrieved knowledge:\n")

                for index, result in enumerate(
                    results,
                    start=1
                ):

                    print(f"RESULT {index}")

                    print(
                        "Source:",
                        result["metadata"].get("source")
                    )

                    print(
                        "Type:",
                        result["metadata"].get("type")
                    )

                    print(
                        "Distance:",
                        round(
                            result["distance"],
                            4
                        )
                    )

                    print("\nContent:")

                    print(
                        result["text"]
                    )

                    print("-" * 60)

        except Exception as error:

            print(
                f"Retrieval error: {error}"
            )