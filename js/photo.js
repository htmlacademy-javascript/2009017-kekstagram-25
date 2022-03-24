import {createData} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureData = createData();

const pictureFragment = document.createDocumentFragment();

pictureData.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments;
  pictureFragment.appendChild(pictureElement);
});

const photo = () => pictures.appendChild(pictureFragment);
export {photo};
