export default function calcTimePassed(time) {
  let mil = Date.now() - time;
  let seconds;
  let minutes;
  let hours;
  let days;
  let result = '';
  seconds = (mil / 1000) || 0;
  mil -= seconds * 1000;

  minutes = (seconds / 60) || 0;
  seconds -= minutes * 60;

  hours = (minutes / 60) || 0;
  minutes -= hours * 60;

  days = (hours / 24) || 0;
  hours -= days * 24;

  const weeks = (days / 7) || 0;
  days -= weeks * 7;
  if (weeks) {
    result += `${weeks} weeks`;
  } else if (days) {
    result += `${days} days`;
  } else if (minutes) {
    result += `${minutes} minutes`;
  } else if (seconds) {
    result += `${seconds} seconds`;
  }
  result += ' ago';
  console.log('weeks,', weeks, 'days', days, 'minutes', minutes, 'seconds', seconds);
  return result;
}

