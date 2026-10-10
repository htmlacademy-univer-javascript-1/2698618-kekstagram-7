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

const parseTimeToMinutes = (time) => {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  return hours * 60 + minutes;
};

const checkMeetingTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartInMinutes = parseTimeToMinutes(workStart);
  const workEndInMinutes = parseTimeToMinutes(workEnd);
  const meetingStartInMinutes = parseTimeToMinutes(meetingStart);
  const meetingEndInMinutes = meetingStartInMinutes + meetingDuration;

  return meetingStartInMinutes >= workStartInMinutes && meetingEndInMinutes <= workEndInMinutes;
};

checkStringLength('проверка', 10);
isPalindrome('топот');
getNumber('2023 год');
checkMeetingTime('08:00', '17:30', '14:00', 90);
