import {sendData} from './api.js';
import {closeImgUpload} from './upload-photo.js';

const REGULAR = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
const MAX_HASHTAG_COUNTER = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = {
  INCORRECT_QUANTITY: 'Максимум 5 хэштегов',
  INCORRECT_START_WITH: 'хэш-тег должен начинаться с символа #',
  INCORRECT_LENGTH: 'максимальная длина хэш-тега 20 символов',
  INCORRECT_CORRECT: 'хэш-тег должен содержать буквы и числа',
  INCORRECT_IDENTICAL: 'хэш-теги должны быть разными',
  INCORRECT_ONLY_HASHTAG: 'хеш-тег не может состоять только из одной решётки'
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const textComment = form.querySelector('.text__description');

const closeMessage = () => document.body.lastChild.remove();

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('div')) {
    closeMessage();
  }
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  const button = successMessage.querySelector('.success__button');
  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);

};

const pristine = new Pristine(form, {
  classTo: 'img-upload__error-text',
  errorTextParent: 'img-upload__error-text',
  errorTextTag: 'div',
});

const creatHashtagArray = (value) => value.toLowerCase().split(' ').filter((item) => item);

const validateHashtagQuantity = (value) => creatHashtagArray(value).length <= MAX_HASHTAG_COUNTER;
const validateHashtagStartWith = (value) => creatHashtagArray(value).every((element) => element.startsWith('#'));
const validateHashtagLength = (value) => creatHashtagArray(value).every((element) => element.length <= MAX_HASHTAG_LENGTH);
const validateHashtagCorrect = (value) => creatHashtagArray(value).every((element) => element.length <= 1 || REGULAR.test(element));
const validateHashtagOnlyHashtag = (value) => creatHashtagArray(value).every((element) => !(element.length === 1 && element === '#'));
const validateHashtagIdentical = (value) => creatHashtagArray(value).every((element, index, array) => array.indexOf(element) === index);

pristine.addValidator(hashtag, validateHashtagQuantity, ErrorMessage.INCORRECT_QUANTITY);
pristine.addValidator(hashtag, validateHashtagStartWith, ErrorMessage.INCORRECT_START_WITH);
pristine.addValidator(hashtag, validateHashtagLength, ErrorMessage.INCORRECT_LENGTH);
pristine.addValidator(hashtag, validateHashtagCorrect, ErrorMessage.INCORRECT_CORRECT);
pristine.addValidator(hashtag, validateHashtagIdentical, ErrorMessage.INCORRECT_IDENTICAL);
pristine.addValidator(hashtag, validateHashtagOnlyHashtag, ErrorMessage.INCORRECT_ONLY_HASHTAG);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
          closeImgUpload();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, textComment, hashtag};
