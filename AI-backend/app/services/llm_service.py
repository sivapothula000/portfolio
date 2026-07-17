# import os
# import time

# from dotenv import load_dotenv
# from google import genai
# from google.genai import errors

# from app.core.prompts import PORTFOLIO_SYSTEM_PROMPT


# load_dotenv()


# class LLMService:

#     def __init__(self):

#         api_key = os.getenv("GEMINI_API_KEY")

#         self.model = os.getenv(
#             "GEMINI_MODEL",
#             "gemini-3.5-flash"
#         )

#         if not api_key:
#             raise ValueError(
#                 "GEMINI_API_KEY is not configured."
#             )

#         self.client = genai.Client(
#             api_key=api_key
#         )


#     def generate_answer(
#         self,
#         question: str,
#         context: str
#     ) -> str:

#         if not question or not question.strip():
#             raise ValueError(
#                 "Question cannot be empty."
#             )

#         if not context or not context.strip():
#             raise ValueError(
#                 "Context cannot be empty."
#             )


#         contents = f"""
# {PORTFOLIO_SYSTEM_PROMPT}

# VERIFIED PORTFOLIO CONTEXT:

# {context}

# USER QUESTION:

# {question}

# Answer the user's question using only the verified portfolio context above.
# """


#         max_attempts = 3


#         for attempt in range(
#             1,
#             max_attempts + 1
#         ):

#             try:

#                 response = (
#                     self.client.models.generate_content(
#                         model=self.model,
#                         contents=contents
#                     )
#                 )


#                 if (
#                     not response.text
#                     or not response.text.strip()
#                 ):

#                     raise RuntimeError(
#                         "The LLM returned an empty response."
#                     )


#                 return response.text.strip()


#             except errors.APIError as exc:

#                 status_code = getattr(
#                     exc,
#                     "code",
#                     None
#                 )


#                 print(
#                     f"[LLM API ERROR] "
#                     f"Status: {status_code} | "
#                     f"{exc}"
#                 )


#                 if status_code in {
#                     429,
#                     503
#                 }:

#                     if attempt < max_attempts:

#                         wait_seconds = (
#                             2 ** (attempt - 1)
#                         )


#                         print(
#                             f"[LLM RETRY] "
#                             f"Attempt {attempt} failed. "
#                             f"Retrying in "
#                             f"{wait_seconds} seconds..."
#                         )


#                         time.sleep(
#                             wait_seconds
#                         )

#                         continue


#                     raise RuntimeError(
#                         "LLM_SERVICE_UNAVAILABLE"
#                     ) from exc


#                 raise RuntimeError(
#                     "Failed to generate the AI response."
#                 ) from exc


#             except RuntimeError:

#                 raise


#             except Exception as exc:

#                 print(
#                     f"[LLM ERROR] {exc}"
#                 )


#                 raise RuntimeError(
#                     "Failed to generate the AI response."
#                 ) from exc


import os

from dotenv import load_dotenv
from groq import Groq

from app.core.prompts import PORTFOLIO_SYSTEM_PROMPT
import logging


load_dotenv()
logger = logging.getLogger(
    __name__
)

class LLMService:

    def __init__(self):

        api_key = os.getenv("GROQ_API_KEY")

        self.model = os.getenv(
            "GROQ_MODEL",
            "llama-3.3-70b-versatile"
        )

        if not api_key:
            raise ValueError(
                "GROQ_API_KEY is not configured."
            )

        self.client = Groq(
            api_key=api_key
        )


    def generate_answer(
        self,
        question: str,
        context: str
    ) -> str:

        if not question or not question.strip():
            raise ValueError(
                "Question cannot be empty."
            )

        if not context or not context.strip():
            raise ValueError(
                "Context cannot be empty."
            )


        prompt = f"""
{PORTFOLIO_SYSTEM_PROMPT}

VERIFIED PORTFOLIO CONTEXT:

{context}

USER QUESTION:

{question}

Answer the user's question using only the verified
portfolio context provided above.

If the answer is not supported by the verified context,
say exactly:

"I don't have verified information about that in Siva's portfolio knowledge base."

Never invent skills, experience, projects, education,
certifications, achievements, employment, or personal information.
"""


        try:

            response = (
                self.client.chat.completions.create(
                    model=self.model,

                    messages=[
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],

                    temperature=0.1
                )
            )


            answer = (
                response
                .choices[0]
                .message
                .content
            )


            if not answer or not answer.strip():
                raise RuntimeError(
                    "Groq returned an empty response."
                )


            return answer.strip()


        except Exception as exc:

            logger.exception(
    "Groq answer generation failed."
)

            raise RuntimeError(
                "Failed to generate the AI response."
            ) from exc