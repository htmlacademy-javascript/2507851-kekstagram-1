const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage () {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

const onCloseButtonClick = () => {
  hideMessage();
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

const showMessage = (title, buttonClass) => {
  document.body.append(title);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  title.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

export const showMessageError = () => {
  showMessage(messageError, '.error__button');
};

export const showMessageSuccess = () => {
  showMessage(messageSuccess, '.success__button');
};

export const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};
