import { renderThumbnails } from './thumbnails.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const pictureId = +thumbnail.dataset.pictureId;
    const pictureData = pictures.find(({ id }) => id === pictureId);

    showBigPicture(pictureData);
  });

  renderThumbnails(pictures, container);
};

export { renderGallery };
