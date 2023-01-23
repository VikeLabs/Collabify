import { Availability } from '@prisma/client';
import { parseTime } from './parseTime';
import {
  TimeSlot,
  PersonInfo,
  FormatDateData,
  DateEntry,
} from 'api-lib/util/calendarStrength/types';

const dataSanitize = (availabilities: Availability[]) => {
  const allDateData = getAllDates(availabilities);
  const timeByDate: DateEntry[] = [];

  /** FORMATTING TIMES **/
  // get all times by date
  for (const date of allDateData) {
    const newDateEntry: DateEntry = {
      date,
      times: new Set(),
    };
    for (const entry of availabilities) {
      const times = entry.times as unknown as TimeSlot[];
      for (const time of times) {
        const [entryDate, startTime] = parseTime(time.startStr);
        const [_, endTime] = parseTime(time.endStr);
        if (entryDate === newDateEntry.date) {
          (newDateEntry.times as Set<number>).add(startTime);
          (newDateEntry.times as Set<number>).add(endTime);
        }
      }
    }
    const parsedTime = Array.from(newDateEntry.times) as number[]; // convert from set to array
    parsedTime.sort((prev, next) => prev - next); // sort ascending order
    newDateEntry.times = parsedTime;
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
  const formatDateData: FormatDateData[] = [];
  for (const date of timeByDate) {
    const newFormatDateEntry = {
      date: date.date,
      times: getTimeIntervals(date.times as number[]),
    };
    formatDateData.push(newFormatDateEntry);
  }
  // Reformating `timeByDate` ends here - passed tests

  /** FORMATTING PEOPLE **/
  const people: PersonInfo[] = [];
  for (const entry of availabilities) {
    const newPerson: PersonInfo = {
      name: entry.userName,
      number: entry.userNumber,
      timesAvailable: [],
    };
    for (const time of entry.times as unknown as TimeSlot[]) {
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

function getAllDates(dates: Availability[]): number[] {
  const allDates: Set<number> = new Set();
  for (const entry of dates) {
    for (const time of entry.times as unknown as TimeSlot[]) {
      try {
        const [startDate] = parseTime(time.startStr);
        const [endDate] = parseTime(time.endStr);

        allDates.add(startDate);
        allDates.add(endDate);
      } catch (e) {
        console.error('Error in `getAllDates`');
        console.error(`Attempted to parse: ${time}`);
        console.error(`Error caught: ${e}`);
        console.error('Skipping to the next iteration.');
        continue;
      }
    }
  }
  return Array.from(allDates);
}

function getTimeIntervals(times: number[]) {
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

export { dataSanitize, getTimeIntervals as sanitizeTime };
