
// Basic date utility functions. For more complex cases Intl or a library like dayjs or luxon should be used.

/**
 * Formats date in AM/PM format
 * @param date Date object to format
 */
export function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
}

/**
 * Formats date in 24 hour format
 * @param date Date object to format
 */
export function format24Hours(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${(minutes < 10 ? '0' + minutes : minutes)}`;
}
