import {getRandomArrayElement, getRandomNumber} from './util.js';

const DESCRIPTIONS_COUNTER = 25;

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

const createMessage = (counter) => {
  if (counter > 1) {
    return `${getRandomArrayElement(TEXTS) } ${ getRandomArrayElement(TEXTS)}`;
  }
  return getRandomArrayElement(TEXTS);
};

const createComments = (index, counter) => {
  const array = [];
  for (let i = 1; i <= counter; i++){
    const object = {
      id: i + index*100,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: createMessage(getRandomNumber(1, 2)),
      name: getRandomArrayElement(USER_NAMES),
    };
    array.push(object);}
  return array;
};

const createPhotoDescription = (counter) => {
  const array = [];
  for (let i = 1; i <= counter; i++){
    const object = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumber(15, 200),
      comments: createComments(i, getRandomNumber(1, 10)),
    };
    array.push(object);
  }
  return array;
};

const createData = () => createPhotoDescription(DESCRIPTIONS_COUNTER);

export {createData};
