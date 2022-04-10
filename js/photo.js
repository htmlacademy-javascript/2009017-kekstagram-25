const COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsBigPicture = bigPicture.querySelector('.social__comments');
const commentBigPicture = bigPicture.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
let displayedComments = 0;
let comments;
let commentsLength;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
};

const onBigPictureCloseClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  removeModalListeners();
}

const makePhotoComments = (array) =>
  array.forEach((item) => {
    const commentElement = commentBigPicture.cloneNode(true);
    const commentElementImg = commentElement.querySelector('.social__picture');
    commentElementImg.src = item.avatar;
    commentElementImg.alt = item.name;
    commentElement.querySelector('.social__text').textContent = item.message;
    commentFragment.appendChild(commentElement);
    commentsBigPicture.append(commentFragment);
  });

const fillBigPicture = (dataId) => {
  bigPicture.querySelector('.big-picture__img img').src = dataId.url;
  bigPicture.querySelector('.likes-count').textContent = dataId.likes;
  bigPicture.querySelector('.social__caption').textContent = dataId.description;
};

const updateCommentLoaderBtn = () => {
  if (displayedComments === comments.length) {
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsLoader.classList.remove('hidden');
};

const showComments = (from, to) => {
  displayedComments = Math.min(to, comments.length);
  makePhotoComments(comments.slice(from, displayedComments));
  commentCount.textContent = `${displayedComments} из ${commentsLength}`;
  updateCommentLoaderBtn();
};

const onCommentLoaderBtnClick = (evt) => {
  evt.preventDefault();
  showComments(displayedComments, displayedComments + COMMENTS_COUNT);
};

const addModalListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  commentsLoader.addEventListener('click', onCommentLoaderBtnClick);
};

function removeModalListeners () {
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  commentsLoader.removeEventListener('click', onCommentLoaderBtnClick);
}

const openBigPicture = (dataId) => {
  commentsBigPicture.innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  comments = dataId.comments;
  commentsLength =  comments.length;
  if (commentsLength <= 5) {
    commentsLoader.classList.add('hidden');
  }
  fillBigPicture(dataId);
  showComments(0, COMMENTS_COUNT);
  addModalListeners();
};

export {openBigPicture};
