// Načtení funkce generateCode
const {generateCode, parseTable, transformTable, libraryCode} = require('../js/signatura2');

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
Permanent	Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]	Reshelve	2592240668	Rett-studovna		No information provided			F44526a	Not for loan	
Permanent	Proměny rodiny v evropské historii : historicko-antropologická esej / Jack Goody ; [z anglického originálu European family, přeložila Petra Diestlerová]	Reshelve	2592240668	Celetná - studovna		No information provided			F44526a	Regular loan	`

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
  });
  console.log(libraryCode(transformed[0]))
})





