from pydantic import BaseModel
from typing import List


class SectionScore(BaseModel):
    heading: str
    fact_density: int
    topic_reinforcement: int
    informational_score: int


class RetrievalBreakdown(BaseModel):
    dom: int
    headings: int
    fact_density: int
    entity_clarity: int
    tone_neutrality: int


class RetrievalScoreResponse(BaseModel):
    final_score: float
    breakdown: RetrievalBreakdown
    sections: List[SectionScore]
