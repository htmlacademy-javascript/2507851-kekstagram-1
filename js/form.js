const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const TAG_PATTERN = /^#[a-za-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: "Максимум хештегов",
  NOT_UNIQUE: "Хештеги не должны повторяться",
  INVALID_PATTERN: "Неправильный хештег",
};

const form = document.querySelector(".img-upload__form");
const overlay = document.querySelector(".img-upload__overlay");
const cancelButton = document.querySelector(".img-upload__cancel");
const fileField = document.querySelector(".img-upload__input");
const hashtagField = document.querySelector(".text__hashtags");
const commentField = document.querySelector(".text__description");

const pristine = new Pristine(form, {
  classTo: "img-upload__field-wrapper",
  errorTextParent: "img-upload__field-wrapper",
  errorTextClass: "img-upload__field-wrapper__error",
});

const showForm = () => {
  overlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onDocumentKeydown);
};

const hideForm = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(" ")
    .filter((tag) => Boolean(tag.length));

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;

const isTagsValid = (value) =>
  normalizeTags(value).every((tag) => TAG_PATTERN.test(tag));

const isTagsCountValid = (value) =>
  normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const isTagsUnique = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function validateHashTags(value) {
  return isTagsCountValid(value) && isTagsUnique(value) && isTagsValid(value);
}

function onDocumentKeydown(evt) {
  if (evt.key === "Escape" && !isTextFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}

const onCancelButtonClick = () => {
  hideForm();
  ErrorText();
};

const onFileInputChange = () => {
  showForm();
};

export const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
};
pristine.addValidator(
  hashtagField,
  validateHashTags,
  "Неверный формат хэштэгов"
);
pristine.addValidator(
  commentField,
  isCommentValid,
  "длина комментария не может быть больше 140 символов"
);

fileField.addEventListener("change", onFileInputChange);
cancelButton.addEventListener("click", onCancelButtonClick);
form.addEventListener("submit", onFormSubmit);
