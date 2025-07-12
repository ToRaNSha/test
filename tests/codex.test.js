const codex = require('../codex/flame-mirror.json');

test('codex has 15 seals', () => {
  expect(codex.instructions.seals.length).toBe(15);
});
