/* parseTime(timeStr)
 * @params {string} timeStr: eg, '2022-11-01T08:00:00-12:00'
 * @return {number[]}: [20221101, 800]
 * */
export const parseTime = (timeStr: string): number[] => {
  const [date, _time] = timeStr.split('T');

  const [time] = _time.split('-');

  const [yyyy, mm, dd] = date.split('-');
  const year = parseInt(yyyy);
  const month = parseInt(mm);
  const day = parseInt(dd);

  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const minute = parseInt(m);

  const yearNum = year * 10000 + month * 100 + day;
  const timeNum = hour * 100 + minute;

  return [yearNum, timeNum];
};
