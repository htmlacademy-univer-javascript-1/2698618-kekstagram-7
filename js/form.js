import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэш-тегов`,
  NOT_UNIQUE: 'Хэш-теги не должны повторяться',
  INVALID_PATTERN: 'Неправильный хэш-тег',
  INVALID_COMMENT_LENGTH: `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`,
};

const ValidatorPriority = {
  PATTERN: 3,
  COUNT: 2,
  UNIQUE: 1,
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileFieldElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');

const pristine = new window.Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) => tagString
  .trim()
  .toLowerCase()
  .split(' ')
  .filter(Boolean);

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const tags = normalizeTags(value);
  return tags.length === new Set(tags).size;
};

const isValidComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === commentFieldElement;

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const hideModal = () => {
  formElement.reset();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormSubmit);
};

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButtonClick() {
  hideModal();
}

const onFileInputChange = () => {
  showModal();
};

pristine.addValidator(
  hashtagFieldElement,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  ValidatorPriority.PATTERN,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  ValidatorPriority.COUNT,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  ValidatorPriority.UNIQUE,
  true
);

pristine.addValidator(
  commentFieldElement,
  isValidComment,
  ErrorText.INVALID_COMMENT_LENGTH
);

const initUploadForm = () => {
  fileFieldElement.addEventListener('change', onFileInputChange);
};

export { initUploadForm };
