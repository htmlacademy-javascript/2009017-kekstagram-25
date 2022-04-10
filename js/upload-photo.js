import {createEffect, imgPreviewClass} from './edit-photo-effects.js';
import {changeSize, changeSizeRemove} from './edit-photo-scale.js';
import {textComment, hashtag} from './validate-edit-photo.js';

const imgUpload = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const pictureUpload = document.querySelector('.img-upload__overlay');
const pictureUploadCancel = document.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closeImgUpload();
  }
};

const openImgUpload = () => {
  pictureUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  changeSize();
  createEffect();
};

const closeImgUpload = () => {
  pictureUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtag.value = '';
  textComment.value = '';
  imgUpload.value = '';
  imgPreviewClass.style = '';
  imgPreviewClass.className = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  changeSizeRemove();
};

pictureUploadCancel.addEventListener('click', () => {
  closeImgUpload();
});

const onUploadFileChange = (evt) => {
  imgUploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  openImgUpload();
};

imgUpload.addEventListener('change', onUploadFileChange);

export {closeImgUpload};
