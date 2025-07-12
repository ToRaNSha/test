const slugify = require('../utils/slugify');

describe('slugify', () => {
  test('converts spaces and punctuation', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('handles underscores and multiple spaces', () => {
    expect(slugify('UPPER_case   Values!!')).toBe('upper-case-values');
  });
});
