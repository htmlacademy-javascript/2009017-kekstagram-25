const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Неправильное число';
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomArrayElement, getRandomNumber};
