import {setStartPageState, setRandomPageState, setDiscussedPageState, setDefaultPageState} from './miniatures.js';
import {closeImgUpload} from './upload-photo.js';
import {setUserFormSubmit} from './validate-edit-photo.js';
import {getData} from './api.js';

getData((photo) => {
  setStartPageState(photo);
  setRandomPageState(photo);
  setDiscussedPageState(photo);
  setDefaultPageState(photo);
});

setUserFormSubmit(closeImgUpload);
