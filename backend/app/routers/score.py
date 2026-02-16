from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.html_fetcher import fetch_html
from app.services.retrieval_scorer import compute_retrieval_score
from app.models.response_models import RetrievalScoreResponse

router = APIRouter()

class UrlRequest(BaseModel):
    url: str

class HtmlRequest(BaseModel):
    html: str


@router.get("/score", response_model=RetrievalScoreResponse)
def score_url(url: str):
    try:
        html = fetch_html(url)
        return compute_retrieval_score(html)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/score-html", response_model=RetrievalScoreResponse)
def score_html(payload: HtmlRequest):
    try:
        return compute_retrieval_score(payload.html)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
