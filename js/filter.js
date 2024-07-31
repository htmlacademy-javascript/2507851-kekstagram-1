import { debounce} from './utils.js';
import { renderGallery, getPicturesList, removePictures } from './gallery.js';

const RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
let currentFilter = FilterType.DEFAULT;

const sortByRandom = (photos) => photos.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_PHOTO_COUNT);
const sortByComment = (photos) => photos.toSorted((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = (filter) => {
  const photos = getPicturesList();

  switch (filter) {
    case FilterType.RANDOM:
      return sortByRandom(photos);
    case FilterType.DISCUSSED:
      return sortByComment(photos);
    default:
      return photos;
  }
};

const switchActiveFilterButton = (el) => {
  const buttonActive = filtersContainer.querySelector('.img-filters__button--active');
  buttonActive?.classList.remove('img-filters__button--active');
  el.classList.add('img-filters__button--active');
  currentFilter = el.id;
};

const repaint = (el) => {
  if (currentFilter === el.id) {
    return;
  }

  const filteredPhotos = getFilteredPhotos(el.id);
  removePictures();
  renderGallery(filteredPhotos);
  switchActiveFilterButton(el);
  currentFilter = el.id;
};

const debouncedFilter = debounce((el) => repaint(el), RERENDER_DELAY);

export const initFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      debouncedFilter(evt.target);
    }
  });
};
