const lexicon = require('../utils/lexicon');

describe('Anuhazi Lexicon', () => {
  test('includes root glyph a-RU', () => {
    const glyphs = lexicon.rootGlyphs.map(g => g.glyph);
    expect(glyphs).toContain('a-RU');
  });

  test('defines 15 flame currents', () => {
    expect(lexicon.flameCurrents.length).toBe(15);
  });
});
