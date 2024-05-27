import { renderGallery } from './gallery';
import { showLargeImage } from './big-picture';

const containerImage = document.querySelector('.pictures');

export const renderPictures = (pictures) => {
  containerImage.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-galleryImage-id]');
    if(!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.galleryImageId
    );
    showLargeImage(picture);
  });

  renderGallery(pictures, containerImage);
};
