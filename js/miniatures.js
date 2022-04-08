import {openBigPicture} from './photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const imgFilter = document.querySelector('.img-filters');
const buttonRandom = imgFilter.querySelector('#filter-random');
const buttonDiscussed = imgFilter.querySelector('#filter-discussed');
const buttonDefault = imgFilter.querySelector('#filter-default');

const createMiniatures = (array) => {
  array.forEach((item) => {
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
};

const createData = (pictureData) => {
  createMiniatures(pictureData);
  imgFilter.classList.remove('img-filters--inactive');
};

const createRandomData = (pictureData) => {
  const copyPictureData = pictureData.slice();
  const pictureDataRandom = copyPictureData.sort(() => Math.random() - 0.5).splice(0, 10);

  buttonRandom.addEventListener('click', () => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    buttonRandom.classList.add('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    createMiniatures(pictureDataRandom);
  });
};

const creatDiscussedData = (pictureData) => {
  const copyPictureData = pictureData.slice();
  const pictureDataDiscussed = copyPictureData.sort((a, b) => b.comments.length - a.comments.length);

  buttonDiscussed.addEventListener('click', () => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    buttonDiscussed.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    createMiniatures(pictureDataDiscussed);
  });
};

const createDefaultData = (pictureData) => {
  buttonDefault.addEventListener('click', () => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    createMiniatures(pictureData);
  });
};
export {createData, createRandomData, creatDiscussedData, createDefaultData};
