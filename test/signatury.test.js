
const {extractSignatures} = require('../js/signatury');
// Příklad použití
const text = `
F35076   pozn. jen sign.
Be10043a
Be11092a-b
Be186151.1a další text
Be18694/12š
`;

describe('test signatury', () => {
  const result = extractSignatures(text);
  // console.log(result);  // ["F35
  it('should extract simple signature', async () => {
    expect(result[0]).toBe("F35076")
  });
  it('should support dashes', async () => {
    expect(result[2]).toBe("Be11092a-b")
  })
  it('should support dots', async () => {
    expect(result[3]).toBe("Be186151.1a")
  })
  
})
