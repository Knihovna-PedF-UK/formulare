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

function endsWithComma(word) {
  // testujeme, jestli má autor na konci čárku
  return /,$/.test(word);
}

function extractSurname(authorText) {
  // Rozdělíme řetězec na jednotlivá slova
  const words = authorText.trim().split(" ");
  
  // Kontrolujeme, zda poslední slova obsahují indikátory kolektivního autorství
  // potřebujeme odstranit závorky z názvu pro správný testování kolektivního autorství
  let clearAuthorText = authorText.replace(/[\[\]\(\)]/g, "");
  const collectiveIndicators = /\b(et|al\.|editor|kol\.|\[.?|\(.?|\.\.\.|…)/i.test(clearAuthorText); 
  console.log("Clear author text:", authorText, clearAuthorText, collectiveIndicators);
  if (collectiveIndicators) {
    return ""; // Vrací prázdný řetězec, pokud je kolektivní autorství
  }

  // vracíme poslední slovo začínající na velký písmeno
  let lowerCased = 0
  let lastWord = ""
  for (let i = 0; i <words.length; i++) {
    let currentWord = words[i];
    // tohle by mělo detekovat "a" mezi jmény, ale bejt ignorovaný když je to součástí textu před prvním autorem
    if(currentWord == "a" && lastWord != ""){
      console.log("Found 'a', returning last word:", lastWord);
      return lastWord;
    }
    if(startsWithUppercase(words[i])){
      // if(i > 0) return lastWord;
      console.log("Checking word:", currentWord);
      lastWord = currentWord;
      if(i > 0 && lowerCased == 0 && endsWithComma(lastWord) {
        return lastWord;
      }
    } else {
      lowerCased += 1;
    } 
  }
  
  return lastWord; // Vrací prázdný řetězec, pokud není příjmení nalezeno
}

function generateCode(text) {
  if(text.trim() === ''){
    return "";
  }
  const [title, authors] = text.split(" / ").map(part => part.trim());
  
  // Extrahuje první záznam v seznamu autorů a rozdělí ho na jednotlivá slova
  const firstAuthor = authors ? authors.split(/;/)[0].trim() : "";
  const firstAuthorWords = firstAuthor.split(" ");

  // Kontrola, zda se v textu s autorem nachází výraz "a kolektiv" nebo podobný
  // const hasCollectiveIndicator = /a kol$|et al$|\(ed$/i.test(firstAuthor);
  
  let  surname = extractSurname(firstAuthor);
  //if(hasCollectiveIndicator) {
  //  //surname = extractSurname(firstAuthor);
  //  surname = "";
  //} else {
  //  if(firstAuthorWords.length <= 3 && firstAuthorWords[0]){
  //    surname = firstAuthorWords.slice(-1)[0];
  //  } else {
  //    surname = "";
  //  }
  //}

  // Odstranění mezer z názvu pro správné generování kódu, aby výslednej kód neobsahoval jen jedno písmeno z názvu, když název začíná jednoznakovym slovem
  let titleWithoutSpaces = title.replace(/\s+/g, '');

  const code = surname != ""
    ? surname.slice(0, 2) + titleWithoutSpaces.slice(0, 2) // standardní kód
    : titleWithoutSpaces.slice(0, 4); // pokud je více než tři slova, bere 4 písmena z názvu
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
    if(row.length > 0 && row[barcode_col]){
      console.log(row[titul_col], row[rules_col], row[signatura_col]);
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
        td.setAttribute("class", name)
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

// vytvoř tabulku s druhýma signaturama, abysme mohli otestovat
function parseOddily(content) {
    const hashTable = {};
    const regex = /\\DefOddil\{([^}]+)\}\{([^}]+)\}\{([^}]*)\}\{([^}]+)\}\{([^}]+)\}\{([^}]*)\}/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        hashTable[key] = true;
    }

    return hashTable;
}

// vytvořit LaTeXovej příkaz
function libraryCode(data){
  if(!data){return ""}
  // Základní prefix, který se změní podle location
  let prefix = data.location.includes("Celetná") ? "\\celetna" : "\\rettigova";
    
  // Podmínka pro pravidlo půjčky
  let loanType = data.rules.includes("Regular loan") ? "[green]" : "[red]";

  // Sestavení řetězce s potřebnými argumenty
  return `${prefix}${loanType}{${data.signatura}}{${data.code}}{${data.barcode}}%`;
}


function generateLaTeX(dataArray, template, zacatek){
  let buffer = []
  for (let i = 0; i < zacatek; i++) {
    buffer.push("\\EmptyBox%");
  }
  // Zavoláme libraryCode na každou položku v dataArray a spojíme výsledné řetězce
  const content = buffer.join("\n") + "\n" + dataArray.map(item => libraryCode(item)).join("\n");
  // Nahradíme řetězec ${content} ve template výsledným řetězcem
  return template.replace('{{content}}', content);
}


// Exportuje funkci pro použití v jiných souborech a pro testování
module.exports = {
  generateCode,
  parseTable, 
  renderTable,
  transformTable,
  parseOddily,
  libraryCode,
  generateLaTeX
};
