import {isEscapeKey} from './utils.js';

const COMMENTS_PART = 5;

const socialComment = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const showCommentsCount = commentsToShowCount.querySelector('.show-comments-count');

let commentsShown = 0;
let currentComments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = socialComment .cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  const commentsToRender = currentComments.slice(commentsShown, commentsShown + COMMENTS_PART);
  commentsShown += commentsToRender.length;

  if (commentsShown >= currentComments.length) {
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

const onCommentsLoaderClick = () => renderComments();

const resetComments = () => {
  commentsShown = 0;
  commentsContainer.innerHTML = '';
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  resetComments();
}

export const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  currentComments = picture.comments;

  renderComments();

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};
