function getRandomNumber (min, max) {
  if (min < max && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Неправильное число';
}
getRandomNumber (4, 10);

