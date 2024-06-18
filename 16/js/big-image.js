import {isEscapeKey} from './utils.js';

const commentsListElement = document.querySelector('#comment').content.querySelector('.social__comment');

const COMMENTS_PART = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');

let commentsShown = 0;
let currentRenderCommentsHandler;

const createComment = ({ avatar, name, message }) => {
  const galleryComments = commentsListElement.cloneNode(true);

  galleryComments.querySelector('.social__picture').src = avatar;
  galleryComments.querySelector('.social__picture').alt = name;
  galleryComments.querySelector('.social__text').textContent = message;

  return galleryComments;
};

const renderComments = (comments) => {
  commentsShown += COMMENTS_PART;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
    commentsToShowCount.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {

    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsContainer.append(fragment);
  commentsToShowCount.querySelector('.show-comments-count').textContent = commentsShown;
};

const clickCommentsLoader = () => renderComments();

const createRenderCommentsHandler = (comments) => {
  renderComments(comments);
};

const renderDataComments = (commentElement) => {
  commentsShown = 0;

  if (commentElement.length > 0) {
    renderComments(commentElement);
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPopupCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);

  if (currentRenderCommentsHandler) {
    closeButton.removeEventListener('click', currentRenderCommentsHandler);
    commentsLoader.removeEventListener('click', currentRenderCommentsHandler);
    commentsToShowCount.removeEventListener('click', currentRenderCommentsHandler);
  }
  const resetComments = () => {
    commentsShown = 0;
    commentsContainer.innerHTML = '';
  };
  resetComments();
}

export const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  renderDataComments(picture.comments);

  closeButton.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  currentRenderCommentsHandler = createRenderCommentsHandler(picture.comments);
  commentsLoader.addEventListener('click', clickCommentsLoader);
  currentRenderCommentsHandler = createRenderCommentsHandler(picture.comments);
  commentsLoader.addEventListener('click', currentRenderCommentsHandler);
};
