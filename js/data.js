import {getRandomInteger, getRandomItem} from './util.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Если чётко сформулировать желание, то всё обязательно сбудется.',
  'Как же круто тут кормят',
  'Норм',
  'Круто',
  'Невероятно!',
  'Я в шоке!',
  'Вы великолепны!',
  'Чувствую будет прекрасно',
  'Вот это вид!',
  'Какая крутая клава!',
  'Вот это тачка!',
  'Тестим новую камеру!',
  'Поздравляю!',
  'Я залип на этой фотке и не могу оторваться',
];

const NAMES = ['Степан', 'Александр', 'Тимур', 'Николай', 'Андрей', 'Даниил', 'Антон', 'Тимофей'];

const initIdCounter = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getCommentId = initIdCounter();

const generateMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomItem(MESSAGES)
).join(' ');

const buildComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
  message: generateMessage(),
  name: getRandomItem(NAMES),
});

const buildPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomItem(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(0, MAX_COMMENTS) },
    buildComment
  ),
});

const generatePhotos = (count) => Array.from(
  { length: count },
  (_, i) => buildPhoto(i + 1)
);

export {generatePhotos};
