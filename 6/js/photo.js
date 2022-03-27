import {createData} from './data.js';
import { openBigPicture } from './open-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureData = createData();
const pictures = document.querySelector('.pictures');

/*
const bigPicture = document.querySelector('.big-picture');

const bigPictureClose = document.querySelector('.big-picture__cancel');
const modalOpen = document.querySelector('body');

const onPictureEscKeydown = (evt) =>{
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const closeBigPicture = function(){
  bigPicture.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureEscKeydown);
};

bigPictureClose.addEventListener('click', ()=> {
  closeBigPicture();
});

const openBigPicture = function (dataId) {
  bigPicture.classList.remove('hidden');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  modalOpen.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = dataId.url;
  bigPicture.querySelector('.likes-count').textContent = dataId.likes;
  bigPicture.querySelector('.comments-count').textContent = dataId.comments.length;
  bigPicture.querySelector('.social__caption').textContent = dataId.description;

  const commentsBigPicture = bigPicture.querySelector('.social__comments');
  const commentBigPicture = bigPicture.querySelector('.social__comment');
  const commentFragment = document.createDocumentFragment();
  const commentsDataId = dataId.comments;

  commentsDataId.forEach((item) => {
    const commentElement = commentBigPicture.cloneNode(true);
    const commentElementImg = commentElement.querySelector('.social__picture');
    commentElementImg.src = item.avatar;
    commentElementImg.alt = item.name;
    commentElement.querySelector('.social__text').textContent = item.message;
    commentFragment.appendChild(commentElement);

  });
  commentsBigPicture.innerHTML = '';
  commentsBigPicture.append(commentFragment);

  document.addEventListener('keydown', onPictureEscKeydown);
};
*/

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
