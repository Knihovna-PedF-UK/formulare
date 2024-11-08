
function parseTable(text) {
  if (text.trim() === '') {
    return [];
  }
  const rows = text.split('\n');
  return rows.map(row => row.split('\t').map(cell => cell.trim()));
}

function renderTable(dataArray, container) {
  if (dataArray.length === 0) return; // Pokud je pole prázdné, nevykresluje

  const table = document.createElement('table');
  dataArray.forEach(rowData => {
    if(rowData){
      const tr = document.createElement('tr');
      rowData.forEach(name => {
        const td = document.createElement('td');
        // td.setAttribute("class", name)
        const cellData = name
        td.textContent = cellData;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    }
  });
  container.innerHTML = ''; // Vyprázdní obsah kontejneru
  container.appendChild(table); // Přidá nově vytvořenou tabulku
}

function barcode(items){
  return `\\carovykod{${items[0]}}{${items[1]}}%`
}


function generateBarcodes(dataArray, template, zacatek){
  console.log(zacatek);
  let buffer = []
  for (let i = 0; i < zacatek; i++) {
    buffer.push("\\EmptyBox%");
  }
  // Zavoláme signaturyCode na každou položku v dataArray a spojíme výsledné řetězce
  const content = buffer.join("\n") + "\n" + dataArray.map(item => barcode(item)).join("\n");
  return template.replace('{{content}}', content);
}
