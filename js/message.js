const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error-response').content.querySelector('.response');
const successDialogTemplate = document.querySelector('#success-response').content.querySelector('.response');
const responseButton = document.querySelector('.response-button');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideDialog();
  }
};

function hideDialog () {
  const exitMessage = document.querySelector('.response');
  exitMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onDocumentClick);
}

const onCloseButtonClick = () => {
  hideDialog();
};

function onDocumentClick(evt) {
  if (evt.target.closest('.response')) {
    return;
  }

  hideDialog();
}

const showDialog = (template, responseButton) => {
  document.body.append(template);
  document.body.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  template.querySelector(responseButton).addEventListener('click', onCloseButtonClick);
};

export const showErrorDialog = () => {
  showDialog(errorDialogTemplate, '.error__button');
};

export const showSuccessDialog = () => {
  showDialog(successDialogTemplate, '.success__button');
};

export const showAlert = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};
