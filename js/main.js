import {getData} from './api.js';
import {renderGallery} from'./gallery.js';
import {showAlert} from './message.js';
import {onFormSubmit, hideForm} from './form.js';

getData()
  .then((pictureList) => {
    renderGallery(pictureList);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

onFormSubmit(hideForm);
