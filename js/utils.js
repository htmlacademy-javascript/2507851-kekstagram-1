const DEBOUNCE_DELAY = 500;

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

