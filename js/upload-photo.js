import {createEffect, removeEffect, imgPreviewClass} from './edit-photo-effects.js';
import {changeSize, changeSizeRemove} from './edit-photo-scale.js';
import {textComment, hashtag} from './validate-edit-photo.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUpload = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const pictureUpload = document.querySelector('.img-upload__overlay');
const pictureUploadCancel = document.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closeImgUpload();
  }
};

const onPictureUploadCancelClick = () => closeImgUpload();

const openImgUpload = () => {
  pictureUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  pictureUploadCancel.addEventListener('click', onPictureUploadCancelClick);
  changeSize();
  createEffect();
};

function closeImgUpload () {
  pictureUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtag.value = '';
  textComment.value = '';
  imgUpload.value = '';
  imgPreviewClass.style = '';
  imgPreviewClass.className = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureUploadCancel.removeEventListener('click', closeImgUpload);
  changeSizeRemove();
  removeEffect();
}

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  const file = imgUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    openImgUpload();
  }
};

imgUpload.addEventListener('change', onUploadFileChange);

export {closeImgUpload};
