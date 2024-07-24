import { debounce, shufflePhotos} from './utils.js';
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
const filterBtnDefault = filtersForm.querySelector('#filter-default');
const filterBtnRandom = filtersForm.querySelector('#filter-random');
const filterBtnDiscussed = filtersForm.querySelector('#filter-discussed');

const getFilteredPhotos = {
  [FilterType.DEFAULT]: (photos) => photos,
  [FilterType.RANDOM]: (photos) => shufflePhotos(photos).slice(0, RANDOM_PHOTO_COUNT),
  [FilterType.DISCUSSED]: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

let currentFilter = FilterType.DEFAULT;

const activateFilterButton = (element) => {
  const buttonActive = filtersContainer.querySelector('.img-filters__button--active');
  buttonActive.classList.remove('img-filters__button--active');
  element.target.classList.add('img-filters__button--active');
};

const repaint = (element, filter, photos) => {

  if (currentFilter !== filter) {
    const filteredPhotos = getFilteredPhotos[filter](photos);
    const photosContainer = document.querySelectorAll('.picture');
    photosContainer.forEach((photo) => photo.remove());

    initGallery(filteredPhotos);
    activateFilterButton(element);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint, RERENDER_DELAY);

export const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filterBtnDefault.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.DEFAULT, photos);
    activateFilterButton(evt);
  });

  filterBtnRandom.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.RANDOM, photos);
    activateFilterButton(evt);
  });

  filterBtnDiscussed.addEventListener('click', (evt) => {
    debouncedRepaint(evt, FilterType.DISCUSSED, photos);
    activateFilterButton(evt);
  });
};

// const sortByRandom = (photos) => shufflePhotos(photos).slice(0, RANDOM_PHOTO_COUNT);

// const sortByComment = (photos) =>photos.toSorted((a, b) => b.comments.length - a.comments.length);


// export const initFilters(debounce(
//   (clickedElement) => {

//     switch (clickedElement.id) {
//       case FilterType.DEFAULT:
//         initGallery(pictures);
//         break;
//       case FilterType.RANDOM:
//         initGallery(sortByRandom(pictures, RANDOM_PHOTO_COUNT));
//         break;
//       case FilterType.DISCUSSED:
//         initGallery(sortByComment(pictures));
//         break;
//     }
//   }, RERENDER_DELAY)
// );

