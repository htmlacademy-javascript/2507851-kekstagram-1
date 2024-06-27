const COUNT_STEP = 25;
const MAX_PHOTO_SIZE = 100;
const MIN_PHOTO_SIZE = 25;

const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scalePhotoSize = document.querySelector('.scale__control--value');
const currentPhoto = document.querySelector('.img-upload__preview img');

let currentValue = parseInt(scalePhotoSize.value, 10);

const reducingPhoto = () => {
  scaleButtonSmaller.addEventListener('click', () => {

    if (currentValue <= MIN_PHOTO_SIZE){
      return false;
    }

    currentValue = currentValue - COUNT_STEP;
    const currentScale = currentValue / 100;
    scalePhotoSize.value = `${currentValue}%`;
    currentPhoto.style.transform = `scale(${currentScale})`;

    return currentValue;
  });
};

const enlargesPhoto = () => {
  scaleButtonBigger.addEventListener('click', () => {

    if (currentValue >= MAX_PHOTO_SIZE){
      return false;
    }

    currentValue = currentValue + COUNT_STEP;
    const currentScale = currentValue / 100;
    scalePhotoSize.value = `${currentValue}%`;
    currentPhoto.style.transform = `scale(${currentScale})`;

    return currentValue;
  });
};

export const clearPhotoSize = () => {
  currentValue = 100;
  currentPhoto.style.transform = 'scale(1)';
  scalePhotoSize.value = '100%';
};


export const resetScale = () => {
  reducingPhoto();
  enlargesPhoto();
};
