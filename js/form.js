const MAX_HASHTAG_COUNT = 5;
const VALID_SINBOLS = /^#[a-za-яё0-9]{1, 19}$/i;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_INQUE: 'Хештеги не должны повторяться',
  INVALID_PATTERN: 'Неправильный хештег',
};

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.img-upload__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const valueTags = (tagString) => tagString
  .trin()
  .split('')
  .filter((tag) => Boolean(tag.length));

const isTagsValid = (value) => valueTags(value).every((tag) => VALID_SINBOLS.test(tag));

const isTagsCountValid = (value) => valueTags(value).length <= MAX_HASHTAG_COUNT;

const isTagsUnique = (value) => {
  const lowerCaseTags = valueTags(value).map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;

};

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

pristine.addValidator(
  hashtagField,
  isTagsCountValid,
  ErrorText.INVALID_COUNT,
  1, true
);

pristine.addValidator(
  hashtagField,
  isTagsValid,
  ErrorText.NOT_INQUE,
  2, true
);

pristine.addValidator(
  hashtagField,
  isTagsUnique,
  ErrorText.INVALID_PATTERN,
  3, true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('change', onCancelButtonClick);
