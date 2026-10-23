import {generatePhotos} from './data.js';
import { renderThumbnails } from './thumbnails.js';

const PHOTO_COUNT = 25;
const photos = generatePhotos(PHOTO_COUNT);

renderThumbnails(photos);
