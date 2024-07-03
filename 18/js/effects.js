const FILTERS = {
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

const DEFAULT_EFFECT = FILTERS.none;
let selectedEffect = DEFAULT_EFFECT;

const imagePreview = document.querySelector('.img-upload__preview img');
const sliderEffectLevel = document.querySelector('.effect-level__slider');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

const isDefault = () => selectedEffect === DEFAULT_EFFECT;

const toggleSliderVisibility = (isVisible) => {
  if (isVisible) {
    uploadEffectLevel.classList.remove('hidden');
  } else {
    uploadEffectLevel.classList.add('hidden');
  }
};

const setSliderValue = () => {
  sliderEffectLevel.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.start,
  });
};

const onEffectsChange = (evt) => {

  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  const effectName = evt.target.value;
  selectedEffect = FILTERS[effectName];

  toggleSliderVisibility(!isDefault());

  imagePreview.className = `effects__preview--${effectName}`;
  setSliderValue();
};

const onSliderUpdate = () => {
  const sliderValue = sliderEffectLevel.noUiSlider.get();
  imagePreview.style.filter = isDefault()
    ? ''
    : `${selectedEffect.filter}`(`${sliderValue}${selectedEffect.units}`);
  effectLevelInput.value = sliderValue;
};

export const resetEffects = () => {
  selectedEffect = DEFAULT_EFFECT;
  setSliderValue();
  imagePreview.className = '';
  imagePreview.style.filter = '';
  toggleSliderVisibility(false);
};

noUiSlider.create(sliderEffectLevel, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.start,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
toggleSliderVisibility(false);

effectsList.addEventListener('change', onEffectsChange);
sliderEffectLevel.noUiSlider.on('update', onSliderUpdate);

// const setSliderValue = () => {
//   sliderEffectLevel.noUiSlider.updateOptions({
//     range: {
//       min: selectedEffect.min,
//       max:selectedEffect.max,
//     },
//     step: selectedEffect.step,
//     start: selectedEffect.max,
//   });
// };

// const onEffectsChange = (evt) => {

//   if (isDefault()) {
//     hideSlider();
//   } else {
//     showSlider();
//   }

//   if (!evt.target.classList.contains('effects__radio')) {
//     return;
//   }
//   selectedEffect = FILTERS.find((filter) => filter.name === evt.target.value);
//   imagePreview.className = `effects__preview-${selectedEffect.name}`;
//   setSliderValue();
// };

// const onSliderUpdate = () => {
//   const sliderValue = sliderEffectLevel.noUiSlider.get();
//   imagePreview.style.filter = isDefault()
//     ? DEFAULT_FILTERS.style : `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
//   effectLevelInput.value = sliderValue;
// };

// export const resetEffects = () => {
//   selectedEffect = DEFAULT_FILTERS;
//   setSliderValue();
// };

// noUiSlider.create(sliderEffectLevel, {
//   range: {
//     min: DEFAULT_FILTERS.min,
//     max: DEFAULT_FILTERS.max,
//   },
//   start: DEFAULT_FILTERS.max,
//   step: DEFAULT_FILTERS.step,
//   connect: 'lower',
// });
// hideSlider();

// effectsList.addEventListener('change', onEffectsChange);
// sliderEffectLevel.noUiSlider.on('update', onSliderUpdate);
