def heading_score(soup):
    h1 = soup.find_all("h1")
    h2 = soup.find_all("h2")
    h3 = soup.find_all("h3")

    score = 0

    # 1️⃣ Single H1 (anchor)
    if len(h1) == 1:
        score += 20

    # 2️⃣ Section Depth
    if len(h2) >= 5:
        score += 30
    elif len(h2) >= 3:
        score += 20

    # 3️⃣ Subsection layering
    if len(h3) >= 5:
        score += 20

    # 4️⃣ Heading length sanity
    valid_headings = [
        h.get_text().strip()
        for h in h2
        if 2 <= len(h.get_text().split()) <= 8
    ]

    if len(valid_headings) >= 3:
        score += 30

    return min(score, 100)
