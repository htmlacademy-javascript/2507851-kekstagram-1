const SCALE_IMAGE_STEP = 25;
const SCALE_IMAGE_MIN = 25;
const SCALE_IMAGE_MAX = 100;
const DEFAULT_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / DEFAULT_SCALE})`;
  scaleControlValue.value = `${value}%`;
  return parseFloat(value);
};

const getInputValue = () => parseInt(scaleControlValue.value, 10);

const onSmallerButtonClick = () => {
  const newValue = Math.max(getInputValue() - SCALE_IMAGE_STEP, SCALE_IMAGE_MIN);
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const newValue = Math.min(getInputValue() + SCALE_IMAGE_STEP, SCALE_IMAGE_MAX);
  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);
