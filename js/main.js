import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { initUploadForm } from './form.js';

const PHOTO_COUNT = 25;
const photos = generatePhotos(PHOTO_COUNT);

renderGallery(photos);
initUploadForm();
