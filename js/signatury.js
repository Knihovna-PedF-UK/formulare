function extractSignatures(text) {
    const signatures = [];
    const lines = text.split('\n');  // Rozdělíme řetězec na jednotlivé řádky

    lines.forEach(line => {
        const match = line.match(/^[A-Za-z0-9ěščřžýáíéúůťďň.,\-/]+/);  // Najdeme signaturu na začátku řádku
        if (match) {
            signatures.push(match[0]);  // Přidáme nalezenou signaturu do pole
        }
    });

    return signatures;
}

module.exports = {
  extractSignatures
}
