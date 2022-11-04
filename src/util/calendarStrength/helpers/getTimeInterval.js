/**
 * getTimeInterval
 * @params {number} startTime
 * @params {number} endTime
 * @return {[]number} timeIntervals
 *
 * In order, the argument `startTime` and `endTime` are passed
 * The function generates an array of intevals
 * eg: getTimeInterval(900, 1200) returns [900, 930, 1000, 1030, 1100, 1130, 1200]
 */
export const getTimeInterval = (startTime, endTime) => {
  if (typeof startTime !== 'number' || typeof endTime !== 'number') {
    throw new Error(
      `invalid argument: expected type number, got ${typeof startTime} ${typeof endTime}`
    );
  }

  if (startTime < 0 || endTime < 0) {
    throw new Error(
      `invalid argument, time has to be a positive integer, got ${startTime}, ${endTime}`
    );
  }

  if (startTime >= endTime) {
    return [];
  }

  const timeIntervals = [];
  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeIntervals.push(currentTime);

    if (currentTime % 100 === 30) {
      // if it's in the half an hour mark
      currentTime += 70;
    } else {
      // if it is not in the half an hour mark
      currentTime += 30;
    }
  }

  return timeIntervals;
};
