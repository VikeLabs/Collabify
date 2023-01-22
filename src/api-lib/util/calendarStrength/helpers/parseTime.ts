/* parseTime(timeStr)
 * @params {string} timeStr: eg, '2022-11-01T08:00:00-12:00'
 * @return {[]int}: [20221101, 800]
 * */
export const parseTime = (timeStr: string): number[] => {
  if (typeof timeStr !== 'string') {
    throw new TypeError(
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

  /* PARSING DATE */
  let dateInt;
  dateInt = date.match(/\d/g);
  dateInt = dateInt.join('');

  /* PARSING TIME */
  let timeInt;
  timeInt = time.split('-')[0]; // removing that weird time flag "-12:00" at the end
  timeInt = time.match(/\d/g);
  timeInt = timeInt.join('');
  timeInt = timeInt.slice(0, 4);

  return [Number(dateInt), Number(timeInt)];
};
