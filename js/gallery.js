import { renderThumbnails } from './thumbnails.js';
import { showBigPicture } from './big-picture.js';

const containerElement = document.querySelector('.pictures');

let currentPictures = [];

const onContainerClick = (evt) => {
  const thumbnailElement = evt.target.closest('[data-picture-id]');
  if (!thumbnailElement) {
    return;
  }

  evt.preventDefault();
  const pictureId = Number(thumbnailElement.dataset.pictureId);
  const pictureData = currentPictures.find(({ id }) => id === pictureId);

  showBigPicture(pictureData);
};

containerElement.addEventListener('click', onContainerClick);

const renderGallery = (pictures) => {
  currentPictures = pictures;
  renderThumbnails(pictures, containerElement);
};

export { renderGallery };
