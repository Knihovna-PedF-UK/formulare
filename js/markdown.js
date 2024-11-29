const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const latexLevels = ["\\section", "\\subsection", "\\subsubsection", "\\paragraph", "\\subparagraph"];
    return latexLevels[depth - 1] + `{${text}}\n\n`;
  }, 
  strong({tokens}) {
    const text = this.parser.parseInline(tokens);
    return `\\textbf{${text}}`;
  },
  em({tokens}) {
    const text = this.parser.parseInline(tokens);
    return `\\emph{${text}}`;
  },
  paragraph({tokens}) {
    const text = this.parser.parseInline(tokens);
    return `${text}\n\n`;
  },
  list({items, ordered, start}) {
    const env = ordered ? 'enumerate' : 'itemize';
    const newitems = []
    items.forEach(item => {
      newitems.push(this.listitem(item));
    });
    return `\\begin{${env}}\n${newitems.join("\n")}\\end{${env}}\n\n`;
  },
  listitem({tokens}) {
    const text = this.parser.parseInline(tokens);
    return `\\item ${text}\n`;
  },
  hr({tokens}) {
    return "\\dotfill{}\n\n"
  },
  codespan({text}){
    const char = findFirstUniqueChar("|=+-@_^!#", text)
    if(char === null) {
      return `\\texttt{${text}}`
    }
    return `\\verb${char}${text}${char}`
  },
  link({href, title, tokens}){
    const text = this.parser.parseInline(tokens);
    return `\\qrlink{${href}}{${text}}`
  },
  table(token){
    // processing of tables
    // adapted code from https://github.com/markedjs/marked/blob/master/src/Renderer.ts
    token.header.every(str => console.log(str));
    if (token.header.every(str => str.text.trim() === "")){
      console.log("not empty");
    } 
    let header = '';

    // header
    let cells = [];

    let aligns = "";
    for (let j = 0; j < token.header.length; j++) {
      cells.push(this.tablecell(token.header[j]));
      aligns += columnalign(token.header[j]);
    }
    header += this.tablerow({ text: cells.join(" & ") });

    let body = '';
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];

      cells = [];
      for (let k = 0; k < row.length; k++) {
        cells.push(this.tablecell(row[k]));
      }

      body += this.tablerow({ text: cells.join(" & ") });
    }
    // if (body) body = `${body}</tbody>`;

    return '\\begin{tabular}{' + aligns +'}\n'
      + header
      + body
      + '\\end{tabular}\n';
  }, 
  tablerow({text}){
    return `${text}\\\\\n`;
  }, 


  tablecell(token) {
    const content = this.parser.parseInline(token.tokens);
    return content
  },

};

marked.use({ renderer: renderer });
