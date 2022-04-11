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
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = item.url;
    picture.querySelector('.picture__likes').textContent = item.likes;
    picture.querySelector('.picture__comments').textContent = item.comments.length;
    picture.addEventListener('click', () => {
      openBigPicture(item);
    });
    pictureFragment.appendChild(picture);
  });
  containerOfPictures.appendChild(pictureFragment);
};

const setStartPageState = (pictureData) => {
  createMiniatures(pictureData);
  imgFilter.classList.remove('img-filters--inactive');
};

const setRandomPageState = (pictureData) => {
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

const setDiscussedPageState = (pictureData) => {
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

const setDefaultPageState = (pictureData) => {
  buttonDefault.addEventListener('click', debounce(() => {
    document.querySelectorAll('.picture').forEach((a) => a.remove());
    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');
    createMiniatures(pictureData);
  }, RERENDER_DELAY));
};

export {setStartPageState, setRandomPageState, setDiscussedPageState, setDefaultPageState};
