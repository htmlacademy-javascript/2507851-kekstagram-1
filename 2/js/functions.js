const isPalindrome = (str) => {
  const tempString = str
    .toLowerCase()
    .replaceAll(' ', '');


  for (let i = 0; i < tempString.length; i ++) {
    const el = tempString[i];

    if(el !== tempString[tempString.length - 1 - i]) {
      return false;
    }
    return true;
  }

  return isPalindrome;
};

isPalindrome('топот');
// isPalindrome('ДовОд');
// isPalindrome('Кекс');
// isPalindrome('Лёша на полке клопа нашёл ');


const convertToNumber = (str) => {
  if (typeof str === 'number') {
    return str;
  }

  let result = '';
  for(const value of str) {
    if (!Number.isNaN(parseInt(value,10))) {
      result += value;
    }
  }

  return parseInt(result, 10);

};
convertToNumber('2023 год');
// имяФункции('2023 год');// 2023
// имяФункции('ECMAScript 2022');// 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');// 7
// имяФункции('а я томат');


const checkingStringLength = (string, length) => string.length <= length;

checkingStringLength('проверяемая строка', 20);
// checkingStringLength('проверяемая строка', 18);
// checkingStringLength('проверяемая строка', 10);

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if(actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;

};

myPadStart('1', 2, '0');
// myPadStart('1', 4, '0');
// myPadStart('q', 4, 'werty');
// myPadStart('q', 4, 'we');
// myPadStart('qwerty', 4, '0');
