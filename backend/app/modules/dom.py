def dom_score(soup):
    h1_tags = soup.find_all("h1")
    h2_tags = soup.find_all("h2")
    h3_tags = soup.find_all("h3")

    divs = soup.find_all("div")
    content_tags = soup.find_all(["p", "ul", "ol", "li"])

    structure_ratio = len(content_tags) / (len(divs) + 1)

    score = 0

    # Single H1
    if len(h1_tags) == 1:
        score += 25

    # Heading hierarchy presence
    if len(h2_tags) >= 3:
        score += 25

    # Structural ratio
    if structure_ratio > 0.35:
        score += 25

    # Script lightness
    if len(soup.find_all("script")) < 10:
        score += 25

    return min(score, 100)
