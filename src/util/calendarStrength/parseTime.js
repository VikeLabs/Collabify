/* parseTime(timeStr)
 * @params {string} timeStr: eg, '2022-11-01T08:00:00'
 * @return {[]int}: [20221101, 800]
 * */
export const parseTime = (timeStr) => {
  if (typeof timeStr !== 'string') {
    throw new Error(
      `invalid argument type, expected type string, got type: ${typeof timeStr}`
    );
  }

  const timeMatched = timeStr.split(/[a-zA-Z]/g);
  if (timeMatched === null) {
    throw new Error(`${timeStr} has no valid delimiter`);
  }
  if (timeMatched.length !== 2) {
    throw new Error(`expected: [date, time], got: ${timeMatched}`);
  }

  const [date, time] = timeMatched;

  // parsing date
  let dateInt;
  dateInt = date.match(/\d/g);
  dateInt = dateInt.join('');
  dateInt = Number(dateInt);

  // parsing time
  let timeInt;
  timeInt = time.match(/\d/g);
  timeInt = timeInt.join('');
  timeInt = timeInt.slice(0, 4);
  timeInt = Number(timeInt);

  return [dateInt, timeInt];
};
