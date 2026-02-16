import spacy

nlp = spacy.load("en_core_web_sm")


def calculate_fact_density(doc):
    sentences = list(doc.sents)

    if not sentences:
        return 0

    informative = 0

    for sent in sentences:
        noun_count = sum(1 for token in sent if token.pos_ in ["NOUN", "PROPN"])
        verb_count = sum(1 for token in sent if token.pos_ == "VERB")

        if noun_count >= 3 and verb_count >= 1:
            informative += 1

    density = informative / len(sentences)

    return min(int(density * 100), 100)


def calculate_topic_reinforcement(doc, topic_lemmas):
    mentions = 0

    for sent in doc.sents:
        sent_lemmas = [token.lemma_.lower() for token in sent if not token.is_stop]

        if all(lemma in sent_lemmas for lemma in topic_lemmas):
            mentions += 1

    if mentions >= 10:
        return 100
    elif mentions >= 5:
        return 70
    elif mentions >= 3:
        return 40
    elif mentions >= 1:
        return 20

    return 0


def analyze_sections(sections: dict):
    section_scores = []

    # Determine primary topic from first heading
    headings = [h for h in sections.keys() if h.lower() != "intro"]

    primary_topic = headings[0] if headings else None

    topic_lemmas = []
    if primary_topic:
        topic_doc = nlp(primary_topic)
        topic_lemmas = [
            token.lemma_.lower()
            for token in topic_doc
            if not token.is_stop
        ]

    for heading, content in sections.items():
        if heading.lower() == "intro":
            continue

        if not content.strip():
            continue

        doc = nlp(content)

        fact_score = calculate_fact_density(doc)
        topic_score = calculate_topic_reinforcement(doc, topic_lemmas)

        informational_score = int((fact_score * 0.6) + (topic_score * 0.4))

        section_scores.append({
            "heading": heading,
            "fact_density": fact_score,
            "topic_reinforcement": topic_score,
            "informational_score": informational_score
        })

    return section_scores
