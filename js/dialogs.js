import { isEscapeKey } from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('data-error');
const errorDialogTemplate = document.querySelector('#error').content.querySelector('[data-dialog]');
const successDialogTemplate = document.querySelector('#success').content.querySelector('[data-dialog]');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideDialog();
  }
};

function hideDialog () {
  const activeDialog = document.querySelector('[data-dialog]');

  if (!activeDialog) {
    return;
  }

  activeDialog.remove();
  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onDocumentClick);
}

function onDocumentClick(evt) {
  if (evt.target.matches('[data-dialog]')) {
    hideDialog();
  }
}

const showDialog = (template) => {
  const dialogElement = template.cloneNode(true);
  document.body.append(dialogElement);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
  dialogElement.querySelector('[data-dialog-close]')?.addEventListener('click', () => {
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
