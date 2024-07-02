const SCALE_IMAGE_STEP = 25;
const SCALE_IMAGE_MIN = 25;
const SCALE_IMAGE_MAX = 100;
const DEFAULT_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - SCALE_IMAGE_STEP;

  if (newValue < SCALE_IMAGE_MIN) {
    newValue = SCALE_IMAGE_MIN;

  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + SCALE_IMAGE_STEP;

  if (newValue > SCALE_IMAGE_MAX) {
    newValue = SCALE_IMAGE_MAX ;
  }
  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);
