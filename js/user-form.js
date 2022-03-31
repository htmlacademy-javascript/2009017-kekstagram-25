const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});


const validateHashtagQuantity = (value) => {
  const hash = value.toLowerCase().split(' ');
  return hash.length <= 5;
};

pristine.addValidator(
  hashtag,
  validateHashtagQuantity,
  'Максимум 5 хэштегов'
);

const validateHashtagIdentical = (value) => {
  const hash = value.toLowerCase().split(' ');
  let result = true;
  hash.forEach((item, index) => {
    for (let j = index+1; j < hash.length; j++) {
      if (item === hash[j]) {
        result = false;
      }
    }
  });
  return result;
};

pristine.addValidator(
  hashtag,
  validateHashtagIdentical,
  'хэштеги должны быть разные'
);


const validateHashtag = (value) => {
  const hash = value.toLowerCase().split(' ');
  let result = true;
  for (let i = 0; i < hash.length; i++) {
    if (re.test(hash[i])) {result = true; } else {result = false;}
  }
  return result;
};

pristine.addValidator(
  hashtag,
  validateHashtag,
  'хэштеги не должны содержать'
);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/*
  const isValid = pristine.validate();
  if (isValid) {
    console.log ('ok');
  } else {
    console.log('ne ok');
  }
  return;
*/

/*
const hash = hashtag.value.toLowerCase().split(' ');
if (hash.length >= 5) {console.log ('много хэштегов'); }
hash.forEach((item, index) => {
  console.log(re.test(hash[index]));
  for (let j = index+1; j < hash.length; j++) {
    if (item === hash[j]) {
      console.log('одинаковые хэштеги');
    } else {
      console.log('okey');
    }
  }
});
*/

