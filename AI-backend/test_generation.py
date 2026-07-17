from app.services.llm_service import LLMService


context = """
Pothula Siva Anand is an AI Full-Stack Developer and a B.Tech student
specializing in Artificial Intelligence and Machine Learning.

Project: PDF RAG Assistant

Description:
An AI-powered PDF question-answering application using
Retrieval-Augmented Generation.

Technologies:
Python, Streamlit, FAISS, Sentence Transformers,
Google Gemini, PyPDF, NumPy, RAG, LLMs.
"""


question = "What AI project has Siva built?"


llm = LLMService()

answer = llm.generate_answer(
    question=question,
    context=context
)

print(answer)