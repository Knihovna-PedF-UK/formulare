
function parseTable(text) {
  if (text.trim() === '') {
    return [];
  }
  const rows = text.split('\n');
  return rows.map(row => row.split('\t').map(cell => cell.trim()));
}

function generateCode(text) {
  let table = parseTable(text);
  let lines = [];
  table.forEach(row => {
      // první sloupec obsahuje číslo regálu
      if (row[0].trim() !== '') {
        let nadpis = `\\cisloregalu{${row[0]}}`;
        lines.push(nadpis);
      }

      // druhý sloupec obsahuje nadpis oddílu
      if (row[1].trim() !== '') {
        let nadpis = `\\nadpis{${row[1]}}`;
        lines.push(nadpis);
      }

      // třetí a čtvrý sloupce obsahujou signaturu a její popisek
      if (row[2].trim() !== '' && row[3].trim() !== '') {
        let popisek = `\\radek{${row[2]}}{${row[3]}}{}`;
        lines.push(popisek);
      }

  });
  return lines.join('\n');
}


module.exports = {
  generateCode,
  parseTable 
}
