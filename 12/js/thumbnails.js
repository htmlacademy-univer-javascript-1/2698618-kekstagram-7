const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');

  pictureElement.dataset.pictureId = id;
  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures, containerElement) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragment.append(thumbnailElement);
  });
  containerElement.append(fragment);
};

export { renderThumbnails };
