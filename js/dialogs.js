import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDialogTemplate = document.querySelector('#error-response').content.querySelector('.response');
const successDialogTemplate = document.querySelector('#success-response').content.querySelector('.response');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideDialog();
  }
};

function hideDialog () {
  const activeDialog = document.querySelector('.response');

  if (!activeDialog) {
    return;
  }

  activeDialog.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick,true);
}

function onDocumentClick(evt) {
  const activeDialog = document.querySelector('.response');
  if (!activeDialog) {
    return;
  }

  if (!evt.target.closest('.response')) {
    hideDialog();
  }
}

const showDialog = (template) => {
  const dialogElement = template.cloneNode(true);
  document.body.append(dialogElement);
  document.addEventListener('click', onDocumentClick, true);
  dialogElement.querySelector('.dialog__cta—close').addEventListener('click', () => {
    hideDialog();
  });
};

export const showErrorDialog = () => {
  showDialog(errorDialogTemplate);
};

export const showSuccessDialog = () => {
  showDialog(successDialogTemplate);
};

export const showAlert = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};
