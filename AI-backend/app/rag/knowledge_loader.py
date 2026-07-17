# import json
# from pathlib import Path


# # backend/app/rag/knowledge_loader.py
# # parents[3] points to the portfolio project root.
# BACKEND_ROOT = Path(__file__).resolve().parents[2]
# KNOWLEDGE_DIR = BACKEND_ROOT / "knowledge"


# def load_knowledge():
#     """
#     Load all JSON files from the knowledge directory.

#     Returns:
#         list[dict]: Documents containing text and metadata.
#     """

#     documents = []

#     if not KNOWLEDGE_DIR.exists():
#         raise FileNotFoundError(
#             f"Knowledge directory not found: {KNOWLEDGE_DIR}"
#         )

#     json_files = sorted(KNOWLEDGE_DIR.glob("*.json"))

#     if not json_files:
#         raise FileNotFoundError(
#             f"No JSON knowledge files found in: {KNOWLEDGE_DIR}"
#         )

#     for file_path in json_files:

#         with open(file_path, "r", encoding="utf-8") as file:
#             data = json.load(file)

#         # Convert the structured JSON into readable text.
#         # We keep each JSON file as one initial document.
#         text = json.dumps(
#             data,
#             indent=2,
#             ensure_ascii=False
#         )

#         documents.append(
#             {
#                 "text": text,
#                 "metadata": {
#                     "source": file_path.name,
#                     "category": file_path.stem
#                 }
#             }
#         )

#     return documents



import json
from pathlib import Path


BACKEND_ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE_DIR = BACKEND_ROOT / "knowledge"


def create_document(text, source, category, item_type):
    return {
        "text": text,
        "metadata": {
            "source": source,
            "category": category,
            "type": item_type
        }
    }


def format_value(value):
    """Convert any JSON value into readable text."""

    if isinstance(value, list):
        return ", ".join(str(item) for item in value)

    if isinstance(value, dict):
        return "\n".join(
            f"{key.replace('_', ' ').title()}: {format_value(val)}"
            for key, val in value.items()
        )

    return str(value)


def dict_to_text(data):
    """Convert a dictionary into readable semantic text."""

    return "\n".join(
        f"{key.replace('_', ' ').title()}: {format_value(value)}"
        for key, value in data.items()
    )


def process_data(data, source, category):
    """
    Convert structured JSON into meaningful semantic documents.
    """

    documents = []

    # Most knowledge files contain one top-level key:
    # {"projects": [...]}
    # {"certifications": [...]}
    # {"career": {...}}
    if isinstance(data, dict) and len(data) == 1:
        root_key = next(iter(data))
        root_value = data[root_key]

        # Example: projects, certifications, achievements
        if isinstance(root_value, list):

            for index, item in enumerate(root_value):

                if isinstance(item, dict):
                    text = dict_to_text(item)
                else:
                    text = str(item)

                documents.append(
                    create_document(
                        text=text,
                        source=source,
                        category=category,
                        item_type=root_key
                    )
                )

            return documents

        # Example: career, contact, profile
        if isinstance(root_value, dict):

            # Split nested list/dictionary categories where useful.
            for key, value in root_value.items():

                if isinstance(value, (list, dict)):
                    text = (
                        f"{key.replace('_', ' ').title()}:\n"
                        f"{format_value(value)}"
                    )

                    documents.append(
                        create_document(
                            text=text,
                            source=source,
                            category=category,
                            item_type=key
                        )
                    )

            # Also preserve the complete document.
            documents.append(
                create_document(
                    text=dict_to_text(root_value),
                    source=source,
                    category=category,
                    item_type=root_key
                )
            )

            return documents

    # Fallback for any different JSON structure
    documents.append(
        create_document(
            text=json.dumps(
                data,
                indent=2,
                ensure_ascii=False
            ),
            source=source,
            category=category,
            item_type=category
        )
    )

    return documents


def load_knowledge():
    """
    Load and semantically split all JSON knowledge files.
    """

    documents = []

    if not KNOWLEDGE_DIR.exists():
        raise FileNotFoundError(
            f"Knowledge directory not found: {KNOWLEDGE_DIR}"
        )

    json_files = sorted(KNOWLEDGE_DIR.glob("*.json"))

    if not json_files:
        raise FileNotFoundError(
            f"No JSON knowledge files found in: {KNOWLEDGE_DIR}"
        )

    for file_path in json_files:

        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        file_documents = process_data(
            data=data,
            source=file_path.name,
            category=file_path.stem
        )

        documents.extend(file_documents)

    return documents