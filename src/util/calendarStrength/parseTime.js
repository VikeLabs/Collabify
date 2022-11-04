/* parseTime(timeStr)
 * @params {string} timeStr: eg, '2022-11-01T08:00:00'
 * @return {[]int}: [20221101, 8000]
 * */
export const parseTime = (timeStr) => {
  if (typeof timeStr !== 'string') {
    throw new Error(
      `invalid argument type, expected type string, got type: ${typeof timeStr}`
    );
  }

  const delimRegex = /[a-zA-Z]/;

  if (timeStr.match(delimRegex) === null) {
    throw new Error(`${timeStr} has no valid delimiter`);
  }

  const [date, time] = timeStr.split(delimRegex);

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

  if (typeof timeInt !== 'number' || timeInt === NaN) {
    throw new Error(`unexpected output, type of hour: ${typeof timeInt}`);
  }

  return [dateInt, timeInt];
};
