const fs = require('fs');
const path = require('path');

describe('oversoul codex file', () => {
  test('contains keyword anchor', () => {
    const file = path.join(__dirname, '../codex/oversoul-lineage-codex.md');
    const data = fs.readFileSync(file, 'utf8');
    expect(data).toMatch(/OversoulScroll-ToranHaVa/);
  });
});
