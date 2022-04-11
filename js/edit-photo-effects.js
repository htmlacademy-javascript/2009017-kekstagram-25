const sliderParent = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const radioButtonParent = document.querySelector('.effects__list');
const imgPreviewClass = document.querySelector('.img-upload__preview img');

const sliderStyles = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  chrome: {
    name: 'grayscale',
    unit: '',
    setting: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    name: 'sepia',
    unit: '',
    setting: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    name: 'invert',
    unit: '%',
    setting: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    name: 'blur',
    unit: 'px',
    setting: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    name: 'brightness',
    unit: '',
    setting: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  }
};

const addClass = (name) => {
  imgPreviewClass.className = '';
  imgPreviewClass.classList.add(`effects__preview--${name}`);
};

const addStyle = (style) => {
  slider.noUiSlider.on('update', () => {
    effectLevelInput.value = slider.noUiSlider.get();
    imgPreviewClass.style.filter = `${style.name}(${effectLevelInput.value}${style.unit})`;
  });
};

const updateSliderStyle = (style) => {
  slider.noUiSlider.updateOptions(
    style.setting
  );
};

const onRadioButtonChange = (evt) => {
  if (evt.target.value === 'none') {
    sliderParent.classList.add('hidden');
    imgPreviewClass.className = '';
    imgPreviewClass.style.filter = 'none';
    return;
  }
  sliderParent.classList.remove('hidden');
  addClass(evt.target.value);
  addStyle(sliderStyles[evt.target.value]);
  updateSliderStyle(sliderStyles[evt.target.value]);
};

const createEffect = () => {
  sliderParent.classList.add('hidden');
  radioButtonParent.addEventListener('change', (evt) => {
    if (evt.target.matches('input[type="radio"]')) {
      onRadioButtonChange(evt);
    }
  });
};

const removeEffect = () => {
  radioButtonParent.removeEventListener('change', (evt) => {
    onRadioButtonChange(evt);
  });
};

noUiSlider.create(slider, sliderStyles.none);

export {createEffect, removeEffect, imgPreviewClass};
