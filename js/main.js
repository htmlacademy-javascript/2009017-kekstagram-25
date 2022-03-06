const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Неправильное число';
};

let i = 0;

getRandomNumber(4, 10);

const checkStringLength = (comment, maxLength) => maxLength >= comment.length;

checkStringLength('Комментарий', 140);

const USER_NAMES = [
  'Алина',
  'Сергей',
  'Мария',
  'Иван',
  'Алена',
  'Виктор',
  'Галина',
  'Марат',
];

const TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Утром',
  'Закат',
  'Мы на отдыхе',
  'Вечеринка',
  'На обеде'
];

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const createMessage = () => {
  const number = getRandomNumber(1, 2);
  if (number > 1) {
    return `${getRandomArrayElement(TEXTS) } ${ getRandomArrayElement(TEXTS)}`;
  }
  return getRandomArrayElement(TEXTS);
};

const createComments = () => {
  return {
    id: getRandomNumber(1, 600),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(USER_NAMES),
  };
};

const createPhotoDescription = () => {
  i += 1;
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: 3}, createComments),
  };
};

const createData = Array.from({length: 25}, createPhotoDescription);
