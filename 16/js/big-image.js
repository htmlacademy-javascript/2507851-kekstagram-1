import {isEscapeKey} from './utils.js';

const COMMENTS_PART = 5;

const commentsListElement = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const showCommentsCount = commentsToShowCount.querySelector('.show-comments-count');

let commentsShown = 0;
let currentComments = [];

const createComment = ({ avatar, name, message }) => {
  const galleryComments = commentsListElement.cloneNode(true);
  galleryComments.querySelector('.social__picture').src = avatar;
  galleryComments.querySelector('.social__picture').alt = name;
  galleryComments.querySelector('.social__text').textContent = message;
  return galleryComments;
};

const renderComments = (comments) => {
  currentComments = comments;
  const commentsToRender = comments.slice(commentsShown, commentsShown + COMMENTS_PART);
  commentsShown += commentsToRender.length;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  commentsToRender.forEach((comment) => {
    fragment.append(createComment(comment));
  });
  commentsContainer.append(fragment);
  showCommentsCount.textContent = commentsShown;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const loadMoreComments = () => renderComments(currentComments);

const resetComments = () => {
  commentsShown = 0;
  commentsContainer.innerHTML = '';
  currentComments = [];
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);

  resetComments();
};

export const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  resetComments();
  renderComments(picture.comments);

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  commentsLoader.addEventListener('click', loadMoreComments);
};
