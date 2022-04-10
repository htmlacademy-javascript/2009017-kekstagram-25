const SCALE_STEP = 25;

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const sizePhotoValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let actualSize = 100;

const setValue = (size) => {
  sizePhotoValue.value = `${size}%`;
  imgPreview.style.transform = `scale(${size/100})`;
  actualSize = size;
};

const onIncreaseButton = () => {
  if (actualSize > 25) {
    const newSize = actualSize - SCALE_STEP;
    setValue(newSize);
  }
};

const onReduceButton = () => {
  if (actualSize < 100) {
    const newSize = actualSize + SCALE_STEP;
    setValue(newSize);
  }
};

const changeSize = () => {
  setValue(100);
  buttonSmaller.addEventListener('click', onIncreaseButton);
  buttonBigger.addEventListener('click', onReduceButton);
};

const changeSizeRemove = () => {
  buttonSmaller.removeEventListener('click', onIncreaseButton);
  buttonBigger.removeEventListener('click', onReduceButton);
};

export {changeSize, changeSizeRemove};
