import {createData} from './miniatures.js';
import {closeImgUpload} from './upload-photo.js';
import {setUserFormSubmit} from './validate-edit-photo.js';
import {getData} from './api.js';


getData((photo) => {
  createData(photo);
});

setUserFormSubmit(closeImgUpload);
