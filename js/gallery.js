import { showBigPicture } from './big-image.js';

const gallery = document.querySelector('#picture').content.querySelector('.picture');
const containetTemplate = document.querySelector('.pictures');

const createPhoto = ({ comments, description, likes, url, id }) => {
  const galleryImage = gallery.cloneNode(true);

  galleryImage.querySelector('.picture__img').src = url;
  galleryImage.querySelector('.picture__img').alt = description;
  galleryImage.querySelector('.picture__comments').textContent = comments.length;
  galleryImage.querySelector('.picture__likes').textContent = likes;
  galleryImage.dataset.galleryImageId = id;

  return galleryImage;
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureGallery = createPhoto(picture);
    fragment.append(pictureGallery);
  });
  containetTemplate.append(fragment);
};

const pictureContainer = document.querySelector('.pictures');
pictureContainer.addEventListener('click', (evt) => {
  showBigPicture(evt.target);
});

