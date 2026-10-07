function checkStringLength(string,maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < normalizedString.length / 2; i++) {
    if (normalizedString.at(i) !== normalizedString.at(-i-1)) {
      return false;
    }
  }

  return true;
}

function getNumber(value) {
  const string = value.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const digit = parseInt(string[i], 10);

    if (!Number.isNaN(digit)) {
      result += digit;
    }
  }

  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
}


checkStringLength('проверка', 10);
isPalindrome('топот');
getNumber('2023 год');
