function slugify(str) {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = slugify;
