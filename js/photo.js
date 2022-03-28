import {createData} from './data.js';
import { openBigPicture } from './open-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureData = createData();
const pictures = document.querySelector('.pictures');

const pictureFragment = document.createDocumentFragment();

pictureData.forEach((item) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = item.url;
  pictureElement.querySelector('.picture__likes').textContent = item.likes;
  pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
  pictureElement.addEventListener('click', () => {
    openBigPicture(item);
  });
  pictureFragment.appendChild(pictureElement);
});

pictures.appendChild(pictureFragment);
