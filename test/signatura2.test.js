// Načtení funkce generateCode
const {generateCode} = require('../js/signatura2');

describe('generateCode function', () => {
  
  it('should generate code "BeZá" for title "Základy Psychologie / Pavel Beneš"', () => {
    const text = "Základy Psychologie / Pavel Beneš";
    expect(generateCode(text)).toBe("BeZá");
  });
  
  it('should generate code "Spec" for long author info in "Speciálněpedagogická čítanka / Zdeňka Michalová ... [et al.] ; Blanka Housarová (editor)"', () => {
    const text = "Speciálněpedagogická čítanka / Zdeňka Michalová ... [et al.] ; Blanka Housarová (editor)";
    expect(generateCode(text)).toBe("Spec");
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
});

