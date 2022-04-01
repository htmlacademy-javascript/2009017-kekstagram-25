const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const commentText = document.querySelector('.text__description');
const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;
const MAX_HASHTAG_COUNTER = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});

const creatHashtagArray = (value) => value.toLowerCase().split(' ').filter((item) => item);
const creatCommentText = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtagQuantity = (value) => creatHashtagArray(value).length <= MAX_HASHTAG_COUNTER;
const validateHashtagStartWith = (value) => creatHashtagArray(value).every((element) => element.startsWith('#'));
const validateHashtagLength = (value) => creatHashtagArray(value).every((element) => element.length <= MAX_HASHTAG_LENGTH);
const validateHashtag = (value) => creatHashtagArray(value).every((element) => regular.test(element));
const validateHashtagIdentical = (value) => creatHashtagArray(value).every((element, index, array) => array.indexOf(element) === index);

pristine.addValidator(hashtag, validateHashtagQuantity, 'Максимум 5 хэштегов');
pristine.addValidator(hashtag, validateHashtagStartWith, 'хэш-тег должен начинаться с символа #');
pristine.addValidator(hashtag, validateHashtagLength, 'максимальная длина хэш-тега 20 символов');
pristine.addValidator(hashtag, validateHashtag, 'хэш-тег должен содержать буквы и числа');
pristine.addValidator(hashtag, validateHashtagIdentical, 'хэш-теги должны быть разными');

pristine.addValidator(commentText, creatCommentText, 'Максимальная длина комментария 140 символов');


form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


