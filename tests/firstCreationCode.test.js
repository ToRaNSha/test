const firstCreationCode = require('../firstCreationCode');

describe('firstCreationCode', () => {
  test('generates correct number of steps', () => {
    const seq = firstCreationCode(4);
    expect(seq.length).toBe(4);
    expect(seq[0]).toEqual({ fission: 0, fusion: 1 });
  });
});
