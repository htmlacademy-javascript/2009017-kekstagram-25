const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsBigPicture = bigPicture.querySelector('.social__comments');
const commentBigPicture = bigPicture.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.classList.remove('hidden');
};

bigPictureClose.addEventListener('click', ()=> {
  closeBigPicture();
});

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

const openBigPicture = (dataId) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = dataId.url;
  bigPicture.querySelector('.likes-count').textContent = dataId.likes;
  bigPicture.querySelector('.social__caption').textContent = dataId.description;

  commentsBigPicture.innerHTML = '';

  const commentsDataId = dataId.comments.slice();
  const commentsDataIdLength =  dataId.comments.length;
  if (commentsDataIdLength <= 5) {
    commentsLoader.classList.add('hidden');
  }

  const firstComments = commentsDataId.splice( 0, 5);
  let commentsCount = firstComments.length;
  makePhotoComments(firstComments);
  commentCount.textContent = `${commentsCount} из ${commentsDataIdLength}`;

  commentsLoader.addEventListener('click', () => {
    const newComments = commentsDataId.splice( 0, 5);
    makePhotoComments(newComments);
    commentsCount += newComments.length;
    commentCount.textContent = `${commentsCount} из ${commentsDataIdLength}`;
    if (commentsDataId.length === 0) {
      commentsLoader.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', onDocumentKeydown);
};

export {openBigPicture};
