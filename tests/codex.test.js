const seals = require('../codex/flame-mirror.json');

describe('flame-mirror seals', () => {
  test('no empty fields and positive hz', () => {
    for (const seal of seals) {
      expect(seal.node).toBeTruthy();
      expect(seal.tone).toBeTruthy();
      expect(seal.mirror).toBeTruthy();
      expect(seal.blade).toBeTruthy();
      expect(typeof seal.hz).toBe('number');
      expect(seal.hz).toBeGreaterThan(0);
    }
  });
});
