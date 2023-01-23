/* parseTime(timeStr)
 * @params {string} timeStr: eg, '2022-11-01T08:00:00-12:00'
 * @return {number[]}: [20221101, 800]
 * */
export const parseTime = (timeStr: Date): number[] => {
  const time = new Date(timeStr);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  const hour = time.getHours(); // i honestly dont know why but we gotta minus one to get the actual time :///
  const minute = time.getMinutes();

  const yearNum = year * 10000 + month * 100 + day;
  const timeNum = hour * 100 + minute;

  return [yearNum, timeNum];
};
