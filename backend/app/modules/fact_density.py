import spacy

nlp = spacy.load("en_core_web_sm")


def fact_density_score(sections: dict) -> int:
    total_sentences = 0
    informative_sentences = 0

    for content in sections.values():
        if not content.strip():
            continue

        doc = nlp(content)
        sentences = list(doc.sents)

        total_sentences += len(sentences)

        for sent in sentences:
            noun_count = sum(1 for token in sent if token.pos_ in ["NOUN", "PROPN"])
            verb_count = sum(1 for token in sent if token.pos_ == "VERB")

            if noun_count >= 3 and verb_count >= 1:
                informative_sentences += 1

    if total_sentences == 0:
        return 0

    density = informative_sentences / total_sentences

    return min(int(density * 100), 100)
