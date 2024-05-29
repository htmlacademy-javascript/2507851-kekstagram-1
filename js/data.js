import { getRandomInteger, getRandomArrayElement } from'./utils.js';

const AVATAR_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMENTS = 10;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Лето - время приключений . #тай #отпуск',
  'Очуметь...Это сделало мой день ',
  'Я по-настоящему залип #Красотища #Отпад!',
  'Это лучшее, что я видел за последнее время',
  'Это фото огонь #фото #огонь',
  'Спасибо, что порадовали мир этим селфи',
  'С такой фигурой можно смело идти за Оскаром #Wooow! #Круто!',
  'Просто кексик',
  'Красота фотографии не имеет границ #Фееричная #фотка',
  'Отправь это селфи в NASA, потому что ты звезда'
];

const NAMES = ['Захар', 'Мари', 'Марк', 'Антон', 'Платон', 'Гордей'];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  name: getRandomArrayElement(NAMES),
  message: getRandomArrayElement(MESSAGES)
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(0, MAX_COMENTS) },
    createComment
  ),
});

export const createPicturesList = (length) =>
  Array.from({ length }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );
