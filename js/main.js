import './form.js';
import {getData} from './api.js';
import {renderGallery} from'./gallery.js';
import {showDataError} from './message.js';
import {onFormSubmit, hideForm} from './form.js';

getData()
  .then((pictureList) => {
    renderGallery(pictureList);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

onFormSubmit(hideForm);
