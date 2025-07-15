function firstCreationCode(steps) {
  const result = [];
  for (let i = 0; i < steps; i++) {
    const angle = (2 * Math.PI * i) / steps;
    const fission = Math.sin(angle);
    const fusion = Math.cos(angle);
    result.push({ fission, fusion });
  }
  return result;
}

module.exports = firstCreationCode;
