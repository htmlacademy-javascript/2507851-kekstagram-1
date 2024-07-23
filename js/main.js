import './form.js';
import {getData} from './api.js';
import {initGallery} from'./gallery.js';
import {showAlert} from './dialogs.js';
import {initFilters} from './filter.js';


getData()
  .then((pictureList) => {
    initGallery(pictureList);
    initFilters(pictureList);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

