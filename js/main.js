import {hideForm, onFormSubmit} from './form.js';
import {renderGallery} from'./gallery.js';
import { showMessageSuccess, showMessageError } from './message.js';
import { getData,sendDate } from './api.js';
import { showAlert } from './utils.js';

onFormSubmit(async (data) => {
  try {
    await sendDate(data);
    hideForm();
    showMessageSuccess();
  } catch {
    showMessageError();
  }

});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
