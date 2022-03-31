import {createData} from './data.js';
import { openBigPicture } from './open-photo.js';
import './user-form.js';

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

const imgUpload = document.querySelector('#upload-file');
const pictureUpload = document.querySelector('.img-upload__overlay');
const pictureUploadCancel = document.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape') {
    closeImgUpload();
  }
};

const openImgUpload = () => {
  pictureUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUpload.addEventListener('click', ()=> {
  openImgUpload();
});

const closeImgUpload = () => {
  pictureUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

pictureUploadCancel.addEventListener('click', ()=> {
  closeImgUpload();
});
