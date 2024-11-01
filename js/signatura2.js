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


function parseTable(text) {
  if (text.trim() === '') {
    return [];
  }
  const rows = text.split('\n');
  return rows.map(row => row.split('\t').map(cell => cell.trim()));
}

// Funkce renderTable: Vykreslí tabulku z pole do zadaného elementu
function renderTable(dataArray, container) {
  if (dataArray.length === 0) return; // Pokud je pole prázdné, nevykresluje

  const table = document.createElement('table');
  dataArray.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach(cellData => {
      const td = document.createElement('td');
      td.textContent = cellData;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  container.innerHTML = ''; // Vyprázdní obsah kontejneru
  container.appendChild(table); // Přidá nově vytvořenou tabulku
}

// Exportuje funkci pro použití v jiných souborech a pro testování
module.exports = {
  generateCode,
  parseTable, 
  renderTable
};
