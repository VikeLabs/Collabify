import { parseTime } from './parseTime.js';

const dataSanitize = (availabilities) => {
  const allDateData = getAllDates(availabilities);
  const timeByDate = [];

  /** FORMATTING TIMES **/
  // get all times by date
  for (const date of allDateData) {
    const newDateEntry = {
      date: date,
      times: new Set(),
    };
    for (const entry of availabilities) {
      const times = entry.times;
      for (const time of times) {
        const [entryDate, startTime] = parseTime(time.startStr);
        const [_, endTime] = parseTime(time.endStr);
        if (entryDate === newDateEntry.date) {
          newDateEntry.times.add(startTime);
          newDateEntry.times.add(endTime);
        }
      }
    }
    newDateEntry.times = [...newDateEntry.times]; // convert from set to array
    newDateEntry.times.sort((prev, next) => prev - next); // sort ascending order
    timeByDate.push(newDateEntry);
  }
  /** get all times by date ends here
   * after this block, the `timeByDate` has the shape:
   *
   *[
   *  { date: 20221030, times: [ 930, 1000, 1100, 1130, 1200, 1400 ] },
   *  { date: 20221031, times: [ 1330, 1500, 1700 ] },
   *  { date: 20221101, times: [ 800, 900, 1100, 1630, 1730 ] }
   *]
   */

  // Reformating `timeByDate`
  const formatDateData = [];
  for (const date of timeByDate) {
    const newFormatDateEntry = {
      date: date.date,
      times: sanitizeTime(date.times),
    };
    formatDateData.push(newFormatDateEntry);
  }
  // Reformating `timeByDate` ends here - passed tests

  /** FORMATTING PEOPLE **/
  const people = [];
  for (const entry of availabilities) {
    const newPerson = {
      name: entry.name,
      number: entry.number,
      timesAvailable: [],
    };
    for (const time of entry.times) {
      try {
        const [date, start] = parseTime(time.startStr);
        const [_, end] = parseTime(time.endStr);
        const newTimeEntry = { date, times: { start, end } };

        newPerson.timesAvailable.push(newTimeEntry);
      } catch (e) {
        console.error('Error in `dataSanitize`');
        console.error(`Attempted to parse: ${time}`);
        console.error(`Error caught: ${e}`);
        console.error(`Skipping to the next iteration`);

        continue;
      }
    }
    people.push(newPerson);
  }

  return [formatDateData, people];
};

/**
 * getAllDates
 * @params {[]object} dates: raw array passed from main function
 * @return {[]number} all unique dates
 */
function getAllDates(dates) {
  const allDates = new Set();
  for (const entry of dates) {
    for (const time of entry.times) {
      try {
        const [startDate] = parseTime(time.startStr);
        const [endDate] = parseTime(time.endStr);

        allDates.add(startDate, endDate);
      } catch (e) {
        console.error('Error in `getAllDates`');
        console.error(`Attempted to parse: ${time}`);
        console.error(`Error caught: ${e}`);
        console.error('Skipping to the next iteration.');
        continue;
      }
    }
  }
  return [...allDates];
}

function sanitizeTime(times) {
  const timeOutput = [];
  for (let i = 0; i < times.length - 1; i++) {
    const timeEntry = {
      start: times[i],
      end: times[i + 1],
    };
    timeOutput.push(timeEntry);
  }

  return timeOutput;
}

export { dataSanitize, sanitizeTime };
