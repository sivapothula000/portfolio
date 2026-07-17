# from fastapi import APIRouter, HTTPException

# from app.models.schemas import ChatRequest, ChatResponse
# from app.rag.generator import PortfolioAnswerGenerator


# router = APIRouter(
#     prefix="/api",
#     tags=["AI Assistant"]
# )


# # Load the RAG pipeline once when this module starts.
# #
# # This is important because loading the SentenceTransformer
# # model for every request would be slow and inefficient.
# generator = PortfolioAnswerGenerator()


# @router.post(
#     "/chat",
#     response_model=ChatResponse
# )
# def chat(request: ChatRequest):

#     try:

#         message = request.message.strip()

#         if not message:
#             raise HTTPException(
#                 status_code=400,
#                 detail="Message cannot be empty."
#             )

#         result = generator.generate_answer(
#             question=message
#         )

#         return ChatResponse(
#             answer=result["answer"],
#             sources=result["sources"],
#             actions=[]
#         )

#     except HTTPException:
#         raise

#     except Exception as error:

#         print(
#             f"[CHAT API ERROR] {error}"
#         )

#         raise HTTPException(
#             status_code=500,
#             detail=(
#                 "The AI assistant is temporarily "
#                 "unable to process your request."
#             )
#         ) from error


from fastapi import (
    APIRouter,
    HTTPException,
    Request
)
import logging

from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings

from app.models.schemas import (
    ChatRequest,
    ChatResponse
)

from app.rag.generator import (
    PortfolioAnswerGenerator
)
logger = logging.getLogger(
    __name__
)
limiter = Limiter(
    key_func=get_remote_address
)
router = APIRouter(
    prefix="/api",
    tags=["AI Assistant"]
)


generator = None


def get_generator():

    global generator

    if generator is None:

        generator = PortfolioAnswerGenerator()

    return generator


@router.post(
    "/chat",
    response_model=ChatResponse
)
@limiter.limit(
    settings.CHAT_RATE_LIMIT
)
def chat(
    request: Request,
    chat_request: ChatRequest
    ):

    try:

        message = (
            chat_request.message.strip()
        )

        portfolio_generator = get_generator()

        result = portfolio_generator.generate_answer(
        question=message
        )

        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"],
            actions=result["actions"]
        )


    except HTTPException:
        raise


    except RuntimeError as error:

        if str(error) == "LLM_SERVICE_UNAVAILABLE":

            logger.warning(
                "All configured LLM services are unavailable."
            )

            raise HTTPException(
                status_code=503,
                detail=(
                    "The AI service is temporarily busy. "
                    "Please try again shortly."
                )
            ) from error


        logger.exception(
            "Unexpected runtime error while "
            "processing chat request."
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "The AI assistant is temporarily "
                "unable to process your request."
            )
        ) from error


    except Exception as error:

        logger.exception(
            "Unexpected error while "
            "processing chat request."
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "The AI assistant is temporarily "
                "unable to process your request."
            )
        ) from error