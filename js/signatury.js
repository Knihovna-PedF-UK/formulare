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

function displaySignaturesInTable(signatures, tableContainer) {

    // Vytvoříme HTML strukturu tabulky
    let tableHTML = '<table border="1"><tr><th>Signatura</th></tr>';

    // Projdeme každou signaturu a přidáme ji jako řádek do tabulky
    signatures.forEach(signature => {
        tableHTML += `<tr><td>${signature}</td></tr>`;
    });

    tableHTML += '</table>';

    // Vložíme HTML tabulky do elementu "tabulka"
    tableContainer.innerHTML = tableHTML;
}

function signaturyCode(str){
  return `\\stitky{${str}}`
}

function generateSignatury(dataArray, template, zacatek){
  let buffer = []
  for (let i = 0; i < zacatek; i++) {
    buffer.push("\\stitky{}%");
  }
  // Zavoláme signaturyCode na každou položku v dataArray a spojíme výsledné řetězce
  const content = buffer.join("\n") + "\n" +dataArray.map(item => signaturyCode(item)).join("\n");
  return template.replace('{{content}}', content);
}
module.exports = {
  extractSignatures, 
  signaturyCode
}
