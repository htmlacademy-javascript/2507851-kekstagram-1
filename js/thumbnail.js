import{ createPicturesList } from './data';

const collectionTemplate = document.querySelector('#picture').content.querySelector('.picture');
const containerCollection = document.querySelector('.pictures');

const similarCollection = createPicturesList();

const similarListFragment = document.createDocumentFragment();

similarCollection.forEach(({ comments, description, likes, url }) => {
  const collectionPicture = collectionTemplate.cloneNode(true);
  collectionPicture.querySelector('.picture__img').src = url;
  collectionPicture.querySelector('.picture__img').alt = description;
  collectionPicture.querySelector('.picture__comments').textContent = comments.length;
  collectionPicture.querySelector('.picture__likes').textContent = likes;

});

containerCollection.append(similarListFragment);

