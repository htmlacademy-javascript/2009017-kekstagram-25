import {openBigPicture} from './photo.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const containerOfPictures = document.querySelector('.pictures');
const imgFilter = document.querySelector('.img-filters');
const buttonRandom = imgFilter.querySelector('#filter-random');
const buttonDiscussed = imgFilter.querySelector('#filter-discussed');
const buttonDefault = imgFilter.querySelector('#filter-default');
const pictureFragment = document.createDocumentFragment();

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
  containerOfPictures.appendChild(pictureFragment);
};

const createData = (pictureData) => {
  createMiniatures(pictureData);
  imgFilter.classList.remove('img-filters--inactive');
};

const createRandomData = (pictureData) => {
  buttonRandom.addEventListener('click', debounce(() => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    const copyPictureData = pictureData.slice();
    const pictureDataRandom = copyPictureData.sort(() => Math.random() - 0.5).splice(0, 10);
    buttonRandom.classList.add('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    createMiniatures(pictureDataRandom);
  }, RERENDER_DELAY));
};

const creatDiscussedData = (pictureData) => {
  buttonDiscussed.addEventListener('click', debounce(() => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    const copyPictureData = pictureData.slice();
    const pictureDataDiscussed = copyPictureData.sort((a, b) => b.comments.length - a.comments.length);
    buttonDiscussed.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    createMiniatures(pictureDataDiscussed);
  }, RERENDER_DELAY));
};

const createDefaultData = (pictureData) => {
  buttonDefault.addEventListener('click', debounce(() => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    createMiniatures(pictureData);
  }, RERENDER_DELAY));
};

export {createData, createRandomData, creatDiscussedData, createDefaultData};
