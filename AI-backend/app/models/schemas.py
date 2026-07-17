# from pydantic import BaseModel, Field


# class ChatRequest(BaseModel):
#     message: str = Field(
#         ...,
#         min_length=1,
#         max_length=1000,
#         description="The visitor's question about Siva."
#     )


# class ChatResponse(BaseModel):
#     answer: str
#     sources: list[str]

#     actions: list[dict] = []


from typing import Literal
from app.core.config import settings

from pydantic import (
    BaseModel,
    Field,
    field_validator
)


MAX_MESSAGE_LENGTH = settings.MAX_MESSAGE_LENGTH


class ChatRequest(BaseModel):

    message: str = Field(
        ...,
        min_length=1,
        max_length=MAX_MESSAGE_LENGTH,
        description=(
            "The visitor's question about Siva."
        )
    )


    @field_validator("message")
    @classmethod
    def validate_message(
        cls,
        value: str
    ) -> str:

        cleaned_message = value.strip()


        if not cleaned_message:

            raise ValueError(
                "Message cannot be empty."
            )


        if len(cleaned_message) > MAX_MESSAGE_LENGTH:

            raise ValueError(
                "Message is too long."
            )


        return cleaned_message


class ChatAction(BaseModel):

    type: Literal[
        "project",
        "github",
        "demo",
        "resume",
        "linkedin",
        "portfolio"
    ]

    label: str

    url: str


class ChatResponse(BaseModel):

    answer: str

    sources: list[str]

    actions: list[ChatAction] = Field(
        default_factory=list
    )