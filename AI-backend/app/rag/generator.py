# from app.rag.retriever import PortfolioRetriever
# from app.services.llm_service import LLMService


# UNKNOWN_RESPONSE = (
#     "I don't have verified information about that "
#     "in Siva's portfolio knowledge base."
# )


# class PortfolioAnswerGenerator:

#     def __init__(self):
#         """
#         Initialize the retrieval and LLM components.
#         """

#         self.retriever = PortfolioRetriever()
#         self.llm_service = LLMService()


#     def _build_context(self, retrieved_documents):
#         """
#         Convert retrieved knowledge documents into a clean context
#         that can be safely passed to the LLM.
#         """

#         context_parts = []

#         for index, document in enumerate(
#             retrieved_documents,
#             start=1
#         ):
#             text = document.get("text", "").strip()
#             metadata = document.get("metadata", {})

#             if not text:
#                 continue

#             source = metadata.get(
#                 "source",
#                 "unknown"
#             )

#             item_type = metadata.get(
#                 "type",
#                 "unknown"
#             )

#             context_part = (
#                 f"VERIFIED RECORD {index}\n"
#                 f"Source: {source}\n"
#                 f"Type: {item_type}\n"
#                 f"Content:\n{text}"
#             )

#             context_parts.append(context_part)

#         return "\n\n---\n\n".join(context_parts)


#     def generate_answer(
#         self,
#         question: str,
#         top_k: int = 5
#     ) -> dict:
#         """
#         Retrieve relevant portfolio knowledge and generate
#         a grounded AI response.
#         """

#         if not question or not question.strip():
#             raise ValueError(
#                 "The question cannot be empty."
#             )

#         question = question.strip()

#         # Step 1: Retrieve relevant verified knowledge
#         retrieved_documents = self.retriever.retrieve(
#             query=question,
#             top_k=top_k
#         )

#         # Step 2: Stop immediately when retrieval finds
#         # no sufficiently relevant information
#         if not retrieved_documents:
#             return {
#                 "answer": UNKNOWN_RESPONSE,
#                 "sources": [],
#                 "retrieved_documents": []
#             }

#         # Step 3: Build context only from retrieved documents
#         context = self._build_context(
#             retrieved_documents
#         )

#         if not context:
#             return {
#                 "answer": UNKNOWN_RESPONSE,
#                 "sources": [],
#                 "retrieved_documents": []
#             }

#         # Step 4: Generate the grounded answer
#         answer = self.llm_service.generate_answer(
#             question=question,
#             context=context
#         )

#         # Step 5: Collect unique knowledge sources
#         sources = []

#         for document in retrieved_documents:
#             source = document.get(
#                 "metadata",
#                 {}
#             ).get("source")

#             if source and source not in sources:
#                 sources.append(source)

#         return {
#             "answer": answer,
#             "sources": sources,
#             "retrieved_documents": retrieved_documents
#         }


# if __name__ == "__main__":

#     generator = PortfolioAnswerGenerator()

#     print(
#         "\nPersonal AI Portfolio Assistant "
#         "— Phase 6 Test"
#     )

#     while True:

#         print("\n" + "=" * 60)

#         question = input(
#             "Ask about Siva "
#             "(type 'exit' to stop): "
#         ).strip()

#         if question.lower() == "exit":
#             print("Generation test stopped.")
#             break

#         try:

#             result = generator.generate_answer(
#                 question=question
#             )

#             print("\nANSWER:\n")
#             print(result["answer"])

#             print("\nSOURCES:")
#             print(
#                 result["sources"]
#                 if result["sources"]
#                 else "No sources"
#             )

#         except Exception as error:

#             print(
#                 f"\nGeneration error: {error}"
#             )

import re

from app.rag.retriever import PortfolioRetriever
from app.services.llm_service import LLMService
from app.utils.url_validator import (
    is_safe_action_url
)


UNKNOWN_RESPONSE = (
    "I don't have verified information about that "
    "in Siva's portfolio knowledge base."
)


class PortfolioAnswerGenerator:

    def __init__(self):

        self.retriever = PortfolioRetriever()
        self.llm_service = LLMService()


    def _build_context(
        self,
        retrieved_documents
    ):

        context_parts = []

        for index, document in enumerate(
            retrieved_documents,
            start=1
        ):

            text = document.get(
                "text",
                ""
            ).strip()

            metadata = document.get(
                "metadata",
                {}
            )

            if not text:
                continue

            source = metadata.get(
                "source",
                "unknown"
            )

            item_type = metadata.get(
                "type",
                "unknown"
            )

            context_part = (
                f"VERIFIED RECORD {index}\n"
                f"Source: {source}\n"
                f"Type: {item_type}\n"
                f"Content:\n{text}"
            )

            context_parts.append(
                context_part
            )

        return "\n\n---\n\n".join(
            context_parts
        )


    def _extract_field(
        self,
        text: str,
        field_name: str
    ):

        pattern = (
            rf"(?im)^{re.escape(field_name)}:\s*(.+)$"
        )

        match = re.search(
            pattern,
            text
        )

        if not match:
            return None

        value = match.group(1).strip()

        if value.lower() in {
            "",
            "none",
            "null"
        }:
            return None

        return value


    def _build_actions(
        self,
        retrieved_documents
        ):

        actions = []
        seen_actions = set()

        for document in retrieved_documents:

            metadata = document.get(
                "metadata",
                {}
            )

            source = metadata.get(
                "source"
            )

            # Actions can only come from verified
            # project knowledge.
            if source != "projects.json":
                continue

            text = document.get(
                "text",
                ""
            )

            github_url = self._extract_field(
                text,
                "Github Url"
            )

            live_url = self._extract_field(
                text,
                "Live Url"
            )


            # -------------------------
            # GitHub action
            # -------------------------

            if (
                github_url
                and is_safe_action_url(
                    github_url
                )
            ):

                action_key = (
                    "github",
                    github_url
                )

                if action_key not in seen_actions:

                    actions.append(
                        {
                            "type": "github",
                            "label": "View GitHub",
                            "url": github_url
                        }
                    )

                    seen_actions.add(
                        action_key
                    )


            # -------------------------
            # Live Demo action
            # -------------------------

            if (
                live_url
                and is_safe_action_url(
                    live_url
                )
            ):

                action_key = (
                    "demo",
                    live_url
                )

                if action_key not in seen_actions:

                    actions.append(
                        {
                            "type": "demo",
                            "label": "Live Demo",
                            "url": live_url
                        }
                    )

                    seen_actions.add(
                        action_key
                    )


        return actions

    def generate_answer(
        self,
        question: str,
        top_k: int = 5
    ) -> dict:

        if not question or not question.strip():

            raise ValueError(
                "The question cannot be empty."
            )


        question = question.strip()


        # Retrieve verified knowledge.
        retrieved_documents = (
            self.retriever.retrieve(
                query=question,
                top_k=top_k
            )
        )


        # No relevant knowledge means no LLM call
        # and no actions.
        if not retrieved_documents:

            return {
                "answer": UNKNOWN_RESPONSE,
                "sources": [],
                "actions": [],
                "retrieved_documents": []
            }


        # Build context only from retrieved knowledge.
        context = self._build_context(
            retrieved_documents
        )


        if not context:

            return {
                "answer": UNKNOWN_RESPONSE,
                "sources": [],
                "actions": [],
                "retrieved_documents": []
            }


        # Generate grounded natural-language answer.
        answer = (
            self.llm_service.generate_answer(
                question=question,
                context=context
            )
        )


        # Collect unique knowledge sources.
        sources = []

        for document in retrieved_documents:

            source = document.get(
                "metadata",
                {}
            ).get(
                "source"
            )

            if (
                source
                and source not in sources
            ):
                sources.append(
                    source
                )


        # Build actions from verified retrieved records.
        actions = self._build_actions(
            retrieved_documents
        )


        return {
            "answer": answer,
            "sources": sources,
            "actions": actions,
            "retrieved_documents": retrieved_documents
        }


if __name__ == "__main__":

    generator = (
        PortfolioAnswerGenerator()
    )

    print(
        "\nPersonal AI Portfolio Assistant "
        "— Phase 7 Smart Action Test"
    )


    while True:

        print(
            "\n"
            + "=" * 60
        )

        question = input(
            "Ask about Siva "
            "(type 'exit' to stop): "
        ).strip()


        if question.lower() == "exit":

            print(
                "Generation test stopped."
            )

            break


        try:

            result = (
                generator.generate_answer(
                    question=question
                )
            )


            print(
                "\nANSWER:\n"
            )

            print(
                result["answer"]
            )


            print(
                "\nSOURCES:"
            )

            print(
                result["sources"]
                if result["sources"]
                else "No sources"
            )


            print(
                "\nACTIONS:"
            )

            print(
                result["actions"]
                if result["actions"]
                else "No actions"
            )


        except Exception as error:

            print(
                f"\nGeneration error: "
                f"{error}"
            )