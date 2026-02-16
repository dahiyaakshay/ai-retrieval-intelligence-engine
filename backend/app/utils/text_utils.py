import re
from bs4 import BeautifulSoup


def clean_html(html: str) -> BeautifulSoup:
    """
    Removes script/style/noscript tags and returns cleaned BeautifulSoup object.
    """
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    return soup


def extract_visible_text(soup: BeautifulSoup) -> str:
    """
    Extracts clean visible text from soup.
    """
    text = soup.get_text(separator=" ", strip=True)

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text)

    return text


def normalize_text(text: str) -> str:
    """
    Lowercases and removes excessive punctuation.
    """
    text = text.lower()
    text = re.sub(r"[^\w\s\.\:\-]", "", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def split_into_sections(soup: BeautifulSoup):
    """
    Splits content into sections using heading tags.
    Returns dictionary: {heading: section_text}
    """

    sections = {}
    current_heading = "intro"
    sections[current_heading] = ""

    for element in soup.find_all(["h1", "h2", "h3", "p", "ul", "ol"]):
        if element.name in ["h1", "h2", "h3"]:
            current_heading = element.get_text(strip=True)
            sections[current_heading] = ""
        else:
            sections[current_heading] += " " + element.get_text(strip=True)

    return sections


def count_words(text: str) -> int:
    return len(text.split())


def sentence_count(doc) -> int:
    return len(list(doc.sents))
