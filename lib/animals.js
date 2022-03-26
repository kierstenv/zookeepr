const fs = require('fs');
const path = require('path');

const filterByQuery = (query, animalsArray) => {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }

    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  } if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  } if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  } if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
};

const findById = (id, animalsArray) => {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
};

const createNewAnimal = (body, animalsArray) => {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, '../data/animals.json'),
    JSON.stringify({animals: animalsArray}, null, 2)
  );
  return animal;
};

const validateAnimal = (animal) => {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  } if (!animal.species || typeof animal.species !== 'string') {
    return false;
  } if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  } if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
};

module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
}