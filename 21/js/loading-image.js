const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effetcsPreview = imgUploadForm.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

export const onInputChange = () => {
  const file = imgUploadFile.files[0];

  if (file && isValidType(file)) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effetcsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgUploadPreview.src}')`;
    });
  }
};
