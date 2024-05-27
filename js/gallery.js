const gallery = document.querySelector('#picture').content.querySelector('.picture');
const containerTemplate = document.querySelector('.pictures');

const createPhoto = ({ comments, description, likes, url, id}) => {
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

  containerTemplate.append(fragment);
};

