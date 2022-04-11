import {showAlert} from './util.js';

const GET_DATA_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте еще раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз.');
    });
};

export {getData, sendData};
