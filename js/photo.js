const filterList = {
  none: {
    min: 0,
    max: 0,
    step: 0,
    start: 1,
    filter: '',
    units: ''
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: 'grayscale',
    units: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: 'sepia',
    units: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    filter: 'invert',
    units: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    filter: 'blur',
    units: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    filter: 'brightness',
    units: ''
  }
};

const sliderEffectLevel = document.querySelector('.effect-level__slider');
const sliderParent = document.querySelector('.img-upload__effect-level');
const inputValueSlider = document.querySelector('.effect-level__value');
const currentPhoto = document.querySelector('.img-upload__preview img');
const listFilter = document.querySelector('.effects__list');
const listFilterOriginal = listFilter.querySelector('#effect-none');

const createSlider = () => {
  noUiSlider.create(sliderEffectLevel, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value),
    }
  });
};

const showSlider = () => {
  sliderEffectLevel.removeAttribute('disabled', true);
  sliderParent.classList.remove('hidden');
};

const hideSlider = () => {
  sliderEffectLevel.setAttribute('disabled', true);
  sliderParent.classList.add('hidden');
};

const clearStyle = () => {
  currentPhoto.style.filter = '';
};

hideSlider();

let currentSettings = {};

listFilter.addEventListener('change', (evt) => {
  const currentFilter = filterList[evt.target.value];

  sliderEffectLevel.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max,
    },
    step: currentFilter.step,
    start: currentFilter.start,
  });

  currentSettings = {
    filter: currentFilter.filter,
    units: currentFilter.units
  };

  showSlider();
  clearStyle();

  if (evt.target.value === 'none') {
    hideSlider();
  }
  currentPhoto.style.filter = `${currentFilter.filter}(${currentFilter.max}${currentFilter.units})`;
});

export const initSlider = () => {
  createSlider();

  sliderEffectLevel.noUiSlider.on('update', () => {
    inputValueSlider.value = sliderEffectLevel.noUiSlider.get();
    currentPhoto.style.filter = `${currentSettings.filter}(${inputValueSlider.value}${currentSettings.units})`;
  });
};

const sliderClear = () => {
  listFilterOriginal.checked = true;
  hideSlider();
  currentPhoto.style.filter = '';
};
sliderClear();
