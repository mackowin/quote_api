const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const generateId = array => {
  const newId = array.length + 1;
  return newId;
}

module.exports = {
  getRandomElement,
  generateId,
};
