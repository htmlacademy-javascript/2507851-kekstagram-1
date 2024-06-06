import { showBigPicture } from './big-image.js';
import { createPicturesList } from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');

const createPhoto = ({ comments, description, likes, url, id }) => {
  const galleryImage = template.cloneNode(true);

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
  gallery.append(fragment);
};

gallery.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (!thumbnail) {
    return;
  }

  const id = Number(thumbnail.dataset.id);
  const photo = createPicturesList(id);
  if(!photo) {
    return;
  }

  showBigPicture(photo);
});

