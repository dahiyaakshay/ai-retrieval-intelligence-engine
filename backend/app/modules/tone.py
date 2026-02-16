from app.config import PROMO_WORDS

def tone_score(text):
    lower = text.lower()
    penalties = sum(lower.count(word) for word in PROMO_WORDS)

    base = 100 - (penalties * 10)

    return max(base, 0)
