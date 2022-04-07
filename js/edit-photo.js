//Изменение размера фото
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const sizePhotoValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

let actualSize = 100;

const setValue = (size) => {
  sizePhotoValue.value = `${size}%`;
  imgPreview.style = `transform: scale(${size/100})`;
  actualSize = size;
};

const onIncreaseButton = () => {
  if (actualSize > 25) {
    const newSize = actualSize - 25;
    setValue(newSize);
  }
};

const onReduceButton = () => {
  if (actualSize < 100) {
    const newSize = actualSize + 25;
    setValue(newSize);
  }
};

const changeSize = () => {
  buttonSmaller.addEventListener('click', onIncreaseButton);
  buttonBigger.addEventListener('click', onReduceButton);
};

const changeSizeRemove = () => {
  buttonSmaller.removeEventListener('click', onIncreaseButton);
  buttonBigger.removeEventListener('click', onReduceButton);
};

//слайдер для эффектов
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll('.effects__item');
const imgPreviewClass = document.querySelector('.img-upload__preview img');

const nameStyle = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
const sliderStyle = [
  {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  },
  {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  },
  {range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  },
  {range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  },
  {range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  },
];

const units = ['', '', '%', 'px', ''];

const addClass = (name) => {
  imgPreviewClass.className = '';
  imgPreviewClass.classList.add(`effects__preview--${name}`);
};

const addStyle = (index) => {
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imgPreviewClass.style = `filter: ${nameStyle[index-1]}(${valueElement.value}${units[index-1]})`;
  });
};

const updateSliderStyle = (index) => {
  sliderElement.noUiSlider.updateOptions(
    sliderStyle[index-1]
  );
};

const createEffect = () => {
  sliderElement.classList.add('hidden');
  radioButtons.forEach((button,index) => {
    button.addEventListener('change', (evt) => {
      if (evt.target.value === 'none') {
        sliderElement.classList.add('hidden');
        imgPreviewClass.className = '';
        imgPreviewClass.style = '';
      } else {
        sliderElement.classList.remove('hidden');
        addClass(evt.target.value);
        addStyle(index);
        updateSliderStyle(index);
      }
    });
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

export {createEffect, changeSize, changeSizeRemove, imgPreviewClass};
