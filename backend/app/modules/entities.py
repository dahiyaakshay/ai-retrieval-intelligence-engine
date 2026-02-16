import re
from collections import Counter
import spacy

nlp = spacy.load("en_core_web_sm")


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def count_topic_mentions(doc, topic: str) -> int:
    topic_doc = nlp(topic)
    topic_lemmas = [token.lemma_.lower() for token in topic_doc if not token.is_stop]

    count = 0

    for sent in doc.sents:
        sent_lemmas = [token.lemma_.lower() for token in sent if not token.is_stop]

        if all(lemma in sent_lemmas for lemma in topic_lemmas):
            count += 1

    return count


def entity_clarity_score(doc, sections: dict) -> int:
    score = 0

    # 1️⃣ Extract primary topic from first heading
    headings = [h for h in sections.keys() if h.lower() != "intro"]

    if headings:
        primary_topic = normalize(headings[0])
        topic_mentions = count_topic_mentions(doc, primary_topic)

        if topic_mentions >= 20:
            score += 50
        elif topic_mentions >= 10:
            score += 40
        elif topic_mentions >= 5:
            score += 25
        elif topic_mentions >= 3:
            score += 15

    # 2️⃣ Named Entity Distribution
    entities = [ent.text for ent in doc.ents]

    if entities:
        counts = Counter(entities)
        total = sum(counts.values())
        most_common_entity, freq = counts.most_common(1)[0]

        dominance_ratio = freq / total

        if dominance_ratio > 0.15:
            score += 30
        elif dominance_ratio > 0.10:
            score += 20
        elif dominance_ratio > 0.05:
            score += 10

    return min(score, 100)
