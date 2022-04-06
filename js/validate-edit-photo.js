const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const regular = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
const MAX_HASHTAG_COUNTER = 5;
const MAX_HASHTAG_LENGTH = 20;

const pristine = new Pristine(form, {
  classTo: 'img-upload__error-text',
  errorTextParent: 'img-upload__error-text',
  errorTextTag: 'div',
});

const creatHashtagArray = (value) => value.toLowerCase().split(' ').filter((item) => item);

const validateHashtagQuantity = (value) => creatHashtagArray(value).length <= MAX_HASHTAG_COUNTER;
const validateHashtagStartWith = (value) => creatHashtagArray(value).every((element) => element.startsWith('#'));
const validateHashtagLength = (value) => creatHashtagArray(value).every((element) => element.length <= MAX_HASHTAG_LENGTH);
const validateHashtag = (value) => creatHashtagArray(value).every((element) => {
  if (element.length > 1) {
    return regular.test(element);
  } else {
    return true;
  }
});
const validateHashtagOnlyHashtag = (value) => creatHashtagArray(value).every((element) => element.length === 1 && element === '#' ? false : true);

const validateHashtagIdentical = (value) => creatHashtagArray(value).every((element, index, array) => array.indexOf(element) === index);

pristine.addValidator(hashtag, validateHashtagQuantity, 'Максимум 5 хэштегов');
pristine.addValidator(hashtag, validateHashtagStartWith, 'хэш-тег должен начинаться с символа #');
pristine.addValidator(hashtag, validateHashtagLength, 'максимальная длина хэш-тега 20 символов');
pristine.addValidator(hashtag, validateHashtag, 'хэш-тег должен содержать буквы и числа');
pristine.addValidator(hashtag, validateHashtagIdentical, 'хэш-теги должны быть разными');
pristine.addValidator(hashtag, validateHashtagOnlyHashtag, 'хеш-тег не может состоять только из одной решётки');

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


