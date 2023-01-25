/**
 * stringifyTime
 * @param {number} date
 * @param {number} time
 * @return {string} - time in ISO8601 format
 *
 * eg: calling stringifyTime(20221010, 900) returns '2022-10-10T09:00:00'
 */
export const stringifyTime = (date: number, time: number): string => {
  // format date
  let dateStr = String(date);
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6);

  dateStr = [year, month, day].join('-');

  // handle time
  let timeStr = String(time);

  if (timeStr.length < 4) {
    timeStr = `0${timeStr}00`;
  } else {
    timeStr += '00';
  }

  const timeComponent = [];
  let charIndex = 0;

  while (charIndex < timeStr.length) {
    timeComponent.push(timeStr.slice(charIndex, charIndex + 2));
    charIndex += 2;
  }

  timeStr = timeComponent.join(':');

  return [dateStr, timeStr].join('T');
};
