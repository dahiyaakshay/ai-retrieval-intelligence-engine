from app.modules.dom import dom_score
from app.modules.headings import heading_score
from app.modules.fact_density import fact_density_score
from app.modules.entities import entity_clarity_score
from app.modules.tone import tone_score
from app.modules.section_analyzer import analyze_sections
from app.config import WEIGHTS
from app.models.response_models import (
    RetrievalScoreResponse,
    RetrievalBreakdown,
    SectionScore
)
from app.utils.text_utils import clean_html, extract_visible_text, split_into_sections

import spacy

nlp = spacy.load("en_core_web_sm")


def compute_retrieval_score(html: str) -> RetrievalScoreResponse:
    print("🔥 USING SECTION-AWARE ENGINE")

    soup = clean_html(html)
    text = extract_visible_text(soup)
    doc = nlp(text)

    sections = split_into_sections(soup)

    # Page-level scoring
    dom = dom_score(soup)
    headings = heading_score(soup)
    facts = fact_density_score(sections)
    entities = entity_clarity_score(doc, sections)
    tone = tone_score(text)

    final_score = (
        dom * WEIGHTS["dom"] +
        headings * WEIGHTS["headings"] +
        facts * WEIGHTS["fact_density"] +
        entities * WEIGHTS["entity_clarity"] +
        tone * WEIGHTS["tone_neutrality"]
    )

    # Section-level scoring
    raw_sections = analyze_sections(sections)

    section_models = [
        SectionScore(**section)
        for section in raw_sections
    ]

    return RetrievalScoreResponse(
        final_score=round(final_score, 2),
        breakdown=RetrievalBreakdown(
            dom=dom,
            headings=headings,
            fact_density=facts,
            entity_clarity=entities,
            tone_neutrality=tone
        ),
        sections=section_models
    )
