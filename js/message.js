const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error').content.querySelector('.error');
const successDialogTemplate = document.querySelector('#success').content.querySelector('.success');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideDialog();
  }
};

function hideDialog () {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onDocumentClick);
}

const onCloseButtonClick = () => {
  hideDialog();
};

function onDocumentClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }

  hideDialog();
}

const showMessage = (title, buttonClass) => {
  document.body.append(title);
  document.body.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  title.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

export const showErrorDialog = () => {
  showMessage(errorDialogTemplate, '.error__button');
};

export const showSuccessDialog = () => {
  showMessage(successDialogTemplate, '.success__button');
};

export const showAlert = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};
