// Funkce generateCode
function generateCode(text) {
  const [title, authors] = text.split("/").map(part => part.trim());
  
  // Extrahuje první záznam v seznamu autorů a rozdělí ho na jednotlivá slova
  const firstAuthor = authors ? authors.split(",")[0].trim() : "";
  const firstAuthorWords = firstAuthor.split(" ");
  
  // Zkontroluje, jestli má první jméno autora nejvýše tři slova
  const code = firstAuthorWords.length <= 3 && firstAuthorWords[0]
    ? firstAuthorWords.slice(-1)[0].slice(0, 2) + title.slice(0, 2) // standardní kód
    : title.slice(0, 4); // pokud je více než tři slova, bere 4 písmena z názvu
  
  return code || ""; // Vrací prázdný řetězec, pokud není kód k dispozici
}

function parseTable(text, tabulka){
  // const text = pole.value;
  if (text.trim()!== '') {
    const rows = text.split('\n');
    const table = document.createElement('table');
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      const cells = row.split('\t');
      cells.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = cell.trim();
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    tabulka.innerHTML = '';
    tabulka.appendChild(table);
  } else {
    alert('Prosím, zadejte text obsahující tabulku s položkami oddělenými tabulátorem.');
  }
}

// Exportuje funkci pro použití v jiných souborech a pro testování
module.exports = {
  generateCode,
  parseTable
};
