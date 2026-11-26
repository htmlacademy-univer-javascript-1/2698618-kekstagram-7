import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';

  const commentImgElement = commentElement.querySelector('.social__picture');
  commentImgElement.src = avatar;
  commentImgElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  commentsShown += nextComments.length;

  const fragment = document.createDocumentFragment();
  nextComments.forEach((item) => {
    const commentElement = createComment(item);
    fragment.append(commentElement);
  });

  commentListElement.append(fragment);
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;
  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closePictureButtonElement.removeEventListener('click', onClosePictureButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  commentsShown = 0;
  comments = [];
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onClosePictureButtonClick() {
  closeBigPicture();
}

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  renderPictureDetails(data);
  comments = data.comments;
  commentsShown = 0;
  commentListElement.innerHTML = '';
  renderComments();
};

export { showBigPicture };
