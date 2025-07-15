const { invocation } = require('../utils/invocation');

describe('Invocation of DhA-Ya-Tei', () => {
  test('includes core phrase', () => {
    const phrases = invocation.map(line => line.phrase);
    expect(phrases).toContain('eh’ Dhu’ TU AUn');
  });

  test('mentions AT-ONE-MENT in meanings', () => {
    const meanings = invocation.map(line => line.meaning).join(' ');
    expect(meanings).toMatch(/AT-ONE-MENT/);
  });
});
