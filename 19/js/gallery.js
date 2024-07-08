import { showBigPicture } from './big-image.js';
import { createPicturesList } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');
const pictureList = createPicturesList(25);

const createPhoto = ({ comments, description, likes, url, id }) => {
  const galleryImage = pictureTemplate.cloneNode(true);

  galleryImage.querySelector('.picture__img').src = url;
  galleryImage.querySelector('.picture__img').alt = description;
  galleryImage.querySelector('.picture__comments').textContent = comments.length;
  galleryImage.querySelector('.picture__likes').textContent = likes;
  galleryImage.dataset.id = id;

  return galleryImage;
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureGallery = createPhoto(picture);
    fragment.append(pictureGallery);
  });

  gallery.append(fragment);
};

gallery.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('[data-id]');

  if (!thumbnail) {
    return;
  }

  const pictureData = pictureList.find(
    (item) => item.id === +thumbnail.dataset.id
  );

  if (!pictureData) {
    return;
  }

  showBigPicture(pictureData);
});

renderGallery(pictureList);

