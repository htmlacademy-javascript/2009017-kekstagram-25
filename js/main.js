import {createData, createRandomData, creatDiscussedData, createDefaultData} from './miniatures.js';
import {closeImgUpload} from './upload-photo.js';
import {setUserFormSubmit} from './validate-edit-photo.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((photo) => {
  createData(photo);
  createRandomData(photo);
  creatDiscussedData(photo);
  createDefaultData(photo);
});

setUserFormSubmit(closeImgUpload);
