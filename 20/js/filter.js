import { debounce, shufflePhotos } from './utils.js';
import { initGallery, getPicturesList } from './gallery.js';

const RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
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

const switchActiveFilterButton = (element) => {
  const buttonActive = filtersContainer.querySelector('.img-filters__button--active');
  buttonActive?.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
};

const repaint = (element) => {
  const filter = element.id;
  if (currentFilter === filter) {
    return;
  }

  const photos = getPicturesList();
  const filteredPhotos = getFilteredPhotos(filter, photos);
  initGallery(filteredPhotos);
  switchActiveFilterButton(element);
  currentFilter = filter;
};

const debouncedRepaint = debounce((element) => repaint(element), RERENDER_DELAY);

export const initFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      debouncedRepaint(evt.target);
    }
  });
};
