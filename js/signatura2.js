// Funkce generateCode
// function generateCode(text) {
//   const [title, authors] = text.split("/").map(part => part.trim());
  
//   // Extrahuje první záznam v seznamu autorů a rozdělí ho na jednotlivá slova
//   const firstAuthor = authors ? authors.split(",")[0].trim() : "";
//   const firstAuthorWords = firstAuthor.split(" ");
  
//   // Zkontroluje, jestli má první jméno autora nejvýše tři slova
//   const code = firstAuthorWords.length <= 3 && firstAuthorWords[0]
//     ? firstAuthorWords.slice(-1)[0].slice(0, 2) + title.slice(0, 2) // standardní kód
//     : title.slice(0, 4); // pokud je více než tři slova, bere 4 písmena z názvu
  
//   return code || ""; // Vrací prázdný řetězec, pokud není kód k dispozici
// }

function startsWithUppercase(word) {
  // Regulární výraz ověřující, že slovo začíná pouze velkým písmenem s případnou diakritikou
  return /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/.test(word);
}

function extractSurname(authorText) {
  // Rozdělíme řetězec na jednotlivá slova
  const words = authorText.trim().split(" ");
  
  // Kontrolujeme, zda poslední slova obsahují indikátory kolektivního autorství
  const collectiveIndicators = /^(a|et|kolektiv|al\.|editor|\[.*|\(.*|\.\.\.|…)/i; 

  // vracíme poslední slovo začínající na velký písmeno
  let lastWord = ""
  for (let i = 0; i <words.length; i++) {
    if(!startsWithUppercase(words[i])){
      if(i > 0) return lastWord;
    }
    lastWord = words[i]
  }
  
  return ""; // Vrací prázdný řetězec, pokud není příjmení nalezeno
}


function generateCode(text) {
  const [title, authors] = text.split("/").map(part => part.trim());
  
  // Extrahuje první záznam v seznamu autorů a rozdělí ho na jednotlivá slova
  const firstAuthor = authors ? authors.split(",")[0].trim() : "";
  const firstAuthorWords = firstAuthor.split(" ");

  // Kontrola, zda se v textu s autorem nachází výraz "a kolektiv" nebo podobný
  const hasCollectiveIndicator = /a kol|et al\.|\(ed.*\)/i.test(firstAuthor);
  
  let surname = ""
  if(hasCollectiveIndicator) {
    surname = extractSurname(firstAuthor);
  } else {
    if(firstAuthorWords.length <= 3 && firstAuthorWords[0]){
      surname = firstAuthorWords.slice(-1)[0];
    } else {
      surname = "";
    }
  }
  const code = surname != ""
    ? surname.slice(0, 2) + title.slice(0, 2) // standardní kód
    : title.slice(0, 4); // pokud je více než tři slova, bere 4 písmena z názvu
  return code || ""; // Vrací prázdný řetězec, pokud není kód k dispozici

  // Generování kódu podle podmínek
  // const code = hasCollectiveIndicator
    // ? title.slice(0, 4) // Pro kolektivní autorství použije čtyři písmena z názvu
    // : firstAuthorWords.slice(-1)[0].slice(0, 2) + title.slice(0, 2); // Jinak prvních 2 písmena příjmení a 2 písmena názvu
}

function parseTable(text) {
  if (text.trim() === '') {
    return [];
  }
  const rows = text.split('\n');
  return rows.map(row => row.split('\t').map(cell => cell.trim()));
}

function transformTable(table, titul_col, barcode_col, location_col, signatura_col, rules_col){
  // ignorujeme první řádek
  const radky = table.slice(1);
  return radky.map(row => {
    if(row.length > 0 && row[titul_col]){
      console.log(row[titul_col]);
      return {
        titul : row[titul_col],
        barcode : row[barcode_col],
        code : generateCode(row[titul_col]),
        location: row[location_col],
        signatura: row[signatura_col],
        rules: row[rules_col],

      };
    }
  });
}

const transformTableOrder = ["titul", "barcode", "code", "location", "signatura", "rules"]

// Funkce renderTable: Vykreslí tabulku z pole do zadaného elementu
function renderTable(dataArray, container) {
  if (dataArray.length === 0) return; // Pokud je pole prázdné, nevykresluje

  const table = document.createElement('table');
  dataArray.forEach(rowData => {
    if(rowData){
      const tr = document.createElement('tr');
      transformTableOrder.forEach(name => {
        const td = document.createElement('td');
        const cellData = rowData[name];
        td.textContent = cellData;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    }
  });
  container.innerHTML = ''; // Vyprázdní obsah kontejneru
  container.appendChild(table); // Přidá nově vytvořenou tabulku
}

// vytvořit LaTeXovej příkaz
function libraryCode(data){
  // Základní prefix, který se změní podle location
  let prefix = data.location.includes("Celetná") ? "\\celetna" : "\\oddil";
    
  // Podmínka pro pravidlo půjčky
  let loanType = data.rules.includes("Regular loan") ? "[green]" : "";

  // Sestavení řetězce s potřebnými argumenty
  return `${prefix}${loanType}{${data.signatura}}{${data.code}}{${data.barcode}}`;
}


function generateLaTeX(dataArray, template){

}


// Exportuje funkci pro použití v jiných souborech a pro testování
module.exports = {
  generateCode,
  parseTable, 
  renderTable,
  transformTable,
  libraryCode,
  generateLaTeX
};
