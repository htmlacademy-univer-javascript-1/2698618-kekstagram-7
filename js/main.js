import { generatePhotos } from './data.js';
import { renderGallery } from './gallery.js';

const PHOTO_COUNT = 25;
const photos = generatePhotos(PHOTO_COUNT);

renderGallery(photos);
