const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const sizePhotoValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

let actualSize;

const setValue = (size) => {
  sizePhotoValue.value = `${size}%`;
  imgPreview.style.transform = `scale(${size/100})`;
  actualSize = size;
};

const onButtonSmallerClick = () => {
  if (actualSize > MIN_SCALE) {
    const newSize = actualSize - SCALE_STEP;
    setValue(newSize);
  }
};

const onButtonBiggerClick = () => {
  if (actualSize < MAX_SCALE) {
    const newSize = actualSize + SCALE_STEP;
    setValue(newSize);
  }
};

const changeSize = () => {
  setValue(MAX_SCALE);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};

const changeSizeRemove = () => {
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
};

export {changeSize, changeSizeRemove};
