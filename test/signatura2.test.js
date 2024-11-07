// Načtení funkce generateCode
const {generateCode, parseTable, transformTable, libraryCode, parseOddily, generateLaTeX} = require('../js/signatura2');

describe('generateCode function', () => {
  
  it('should generate code "BeZá" for title "Základy Psychologie / Pavel Beneš"', () => {
    const text = "Základy Psychologie / Pavel Beneš";
    expect(generateCode(text)).toBe("BeZá");
  });
  
  it('should generate code "Spec" for long author info in "Speciálněpedagogická čítanka / Zdeňka Michalová ... [et al.] ; Blanka Housarová (editor)"', () => {
    const text = "Speciálněpedagogická čítanka / Zdeňka Michalová ... [et al.] ; Blanka Housarová (editor)";
    expect(generateCode(text)).toBe("MiSp");
  });
  
  it('should generate code "NoTa" for title with no author like "Notable Title /"', () => {
    const text = "Notable Title /";
    expect(generateCode(text)).toBe("Nota");
  });
  
  it('should handle missing title and author gracefully', () => {
    const text = "/";
    expect(generateCode(text)).toBe("");
  });
  
  it('should generate code "DoJa" for title "JavaScript Insights / Johana Doe-Nováková"', () => {
    const text = "JavaScript Insights / John Doe";
    expect(generateCode(text)).toBe("DoJa");
  });
  
  it('should generate code "ZeAn" for title "Analyzing Algorithms / Alice Zed"', () => {
    const text = "Analyzing Algorithms / Alice Zed";
    expect(generateCode(text)).toBe("ZeAn");
  });
  it('should generate code "Anal" for title "Analyzing Algorithms / "', () => {
    const text = "Analyzing Algorithms / ";
    expect(generateCode(text)).toBe("Anal");
  });
  it('should generate code "KoZá" for title "Základy sociální psychologie / Rudolf Kohoutek a kolektiv"', () => {
    const text = "Základy sociální psychologie / Rudolf Kohoutek a kolektiv";
    expect(generateCode(text)).toBe("KoZá");
  });
  it('should generate GoPr for title "Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]"', async () => {
    const text = "Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]"
    expect(generateCode(text)).toBe("GoPr");
  })
});

let table = `Typ změny	Titul	Cílové umístění	Čárový kód	Umístění	Popis	Typ signatury	Signatura	Přírůstkové číslo holdingu	Signatura jednotky	Výpůjční pravidla pro danou jednotku	Termín vrácení
Permanent	Základy sociální psychologie / Rudolf Kohoutek a kolektiv	Reshelve	2599801586	Rett-studovna		No information provided	PSYCH 4		F32163	Not for loan	
Permanent	Psychologie učení : teoretické a výzkumné poznatky pro edukační praxi / Jan Průcha	Reshelve	2592232314	Rett-studovna		No information provided	PSYCH 8		F55817b	Not for loa	
Permanent	Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]	Reshelve	2592240668	Rett-studovna		No information provided	25/NEWZW		F44526a	Not for loan	
Permanent	Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]	Reshelve	2592240668	Celetná - studovna		No information provided	25/NEWZW		F44526a	Regular loan	`

let result = parseTable(table);
describe("parse table", () => {
  it("Should parse table", () => {
    expect(result.length).toBe(5);
  });
  it("Should ignore empty table", () => {
    expect(parseTable("").length).toBe(0);
  });
  let first = result[0]
  it("Should return object", () => {
    expect(first[0]).toBe("Typ změny");
  });
});

const titul_col =1;
const barcode_col = 3;
const location_col = 4;
const signatura_col = 7;
const rules_col = 10;
let transformed = transformTable(result, titul_col, barcode_col, location_col, signatura_col, rules_col)

describe('transformTable', () => {
  it("Should return two rows", () => {
    console.log(transformed);
    expect(transformed.length).toBe(4);
  });
  it("Should generate code", () => {
    expect(transformed[0].code).toBe("KoZá");
    // transformed.forEach(element => {
    //   console.log(libraryCode(element))
    // });
  });
})

describe('libraryCode', ()=> {
  it('should generate library codes', async () => {
    expect(libraryCode(transformed[0])).toBe("\\oddil{PSYCH 4}{KoZá}{2599801586}");
    expect(libraryCode(transformed[1])).toBe("\\oddil{PSYCH 8}{PrPs}{2592232314}");
    // tohle je knížka z Rettigovky
    expect(libraryCode(transformed[2])).toBe("\\oddil{25/NEWZW}{GoPr}{2592240668}");
    expect(libraryCode(transformed[3])).toBe("\\celetna[green]{25/NEWZW}{GoPr}{2592240668}");
  });

})

describe('generateLaTeX', () => {
  const template = `\\documentclass{article}
\\begin{document}
{{content}}
\\end{document}`
  it("should expand template", () => {
    const latexCode = generateLaTeX(transformed, template)
    expect(latexCode.includes("\\oddil")).toBe(true);
    expect(latexCode.includes("\\celetna")).toBe(true);
  })
})

describe('parseOddily', () => {
  let oddily = `
\\DefOddil{FILM}{FILM}{}{yellow}{brown}{Film}
\\DefOddil{FILOZOF}{FILOZOF}{}{green}{white}{Filozofie}
\\DefOddil{FYZIKA}{FYZIKA}{}{yellow}{green}{Fyzika}
\\DefOddil{HV}{HV}{}{green}{brown}{Hudební výchova}
\\DefOddil{IKM 1}{IKM}{1}{brown}{yellow}{Informace}
\\DefOddil{IKM 2}{IKM}{2}{brown}{yellow}{Média}
\\DefOddil{IKM 3}{IKM}{3}{brown}{yellow}{ICT}`
  let hash = parseOddily(oddily)
  it("should parse oddily", () => {
    expect(hash["nahodny"]).toBe(undefined);
    expect(hash["FILM"]).toBe(true);
  })

})




