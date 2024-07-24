import { debounce, shufflePhotos } from './utils.js';
import { initGallery } from './gallery.js';

const RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

const sortByRandom = (photos) => shufflePhotos(photos).slice(0, RANDOM_PHOTO_COUNT);
const sortByComment = (photos) =>photos.toSorted((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = (filter, photos) => {
  switch (filter) {
    case FilterType.RANDOM:
      return sortByRandom(photos);
    case FilterType.DISCUSSED:
      return sortByComment(photos);
    default:
      return photos;
  }
};

let currentFilter = FilterType.DEFAULT;

const activateFilterButton = (element) => {
  const buttonActive = filtersContainer.querySelector('.img-filters__button--active');

  if (buttonActive) {
    buttonActive.classList.remove('img-filters__button--active');
  }
  element.classList.add('img-filters__button--active');
};

const repaint = (filter, photos, element) => {

  if (currentFilter !== filter) {
    const filteredPhotos = getFilteredPhotos(filter, photos);
    const photosContainer = document.querySelectorAll('.picture');
    photosContainer.forEach((photo) => photo.remove());

    initGallery(filteredPhotos);
    activateFilterButton(element);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce((filter, photos, element) => repaint(filter, photos, element), RERENDER_DELAY);

export const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('img-filters__button')) {
      const filter = evt.target.id.replace('filter-', '');
      debouncedRepaint(filter, photos, evt.target);
    }
  });
};
