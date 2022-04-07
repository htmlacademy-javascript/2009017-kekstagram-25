import {showAlert} from './util.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const textComment = form.querySelector('.text__description');
const regular = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
const MAX_HASHTAG_COUNTER = 5;
const MAX_HASHTAG_LENGTH = 20;

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
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  const button = successMessage.querySelector('.success__button');
  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
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
          showAlert('Не удалось отправить форму. Попробуйте еще раз.');
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, textComment, hashtag};


