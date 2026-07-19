export function cleanEvidence(text: string, maxLength = 500) {

    if (!text) return "";

    text = text

        // citations
        .replace(/\[[^\]]+\]/g, "")

        // markdown headings
        .replace(/#{1,6}\s?/g, "")

        // urls inside text
        .replace(/https?:\/\/\S+/g, "")

        // markdown separators
        .replace(/[-_=]{3,}/g, "")

        // bullets
        .replace(/[•▪►◆■★☆]/g, "")

        // repeated spaces
        .replace(/\s+/g, " ")

        // weird symbols
        .replace(/[^\x20-\x7E]/g, "")

        // duplicate words
        .replace(/\b(\w+)( \1\b)+/gi, "$1")

        .trim();

    // remove noisy sections
    const blacklist = [
        "Related Searches",
        "Top Questions",
        "News",
        "Popular",
        "Advertisement",
        "Cookie",
        "Privacy",
        "Sign in",
        "Subscribe"
    ];

    for (const word of blacklist) {

        const idx = text.indexOf(word);

        if (idx !== -1) {
            text = text.substring(0, idx);
        }
    }

    const sentences = text.match(/[^.!?]+[.!?]+/g);

    if (!sentences)
        return text.substring(0, maxLength);

    let result = "";

    for (const sentence of sentences) {

        if (
            result.length + sentence.length >
            maxLength
        ) break;

        result += sentence.trim() + " ";
    }

    return result.trim();
}