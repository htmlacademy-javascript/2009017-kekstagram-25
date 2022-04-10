const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll('.effects__item');
const imgPreviewClass = document.querySelector('.img-upload__preview img');

const namesOfStyles = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
const sliderStyles = [
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
    imgPreviewClass.style.filter = `${namesOfStyles[index-1]}(${valueElement.value}${units[index-1]})`;
  });
};

const updateSliderStyle = (index) => {
  sliderElement.noUiSlider.updateOptions(
    sliderStyles[index-1]
  );
};

const createEffect = () => {
  sliderElement.classList.add('hidden');
  radioButtons.forEach((button,index) => {
    button.addEventListener('change', (evt) => {
      if (evt.target.value === 'none') {
        sliderElement.classList.add('hidden');
        imgPreviewClass.className = '';
        imgPreviewClass.style.filter = 'none';
        return;
      }
      sliderElement.classList.remove('hidden');
      addClass(evt.target.value);
      addStyle(index);
      updateSliderStyle(index);
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

export {createEffect, imgPreviewClass};
