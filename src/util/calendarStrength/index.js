import { dataSanitize } from './helpers/dataSanitize.js';
import { isAvailable } from './helpers/isAvailable.js';
import { stringifyTime } from './helpers/stringifyTime.js';

export const splitAvailabilities = ({ availabilities }) => {
  const [events, people] = dataSanitize(availabilities);
  let splitAvails = []; // to be returned
  for (const event of events) {
    for (const time of event.times) {
      const newEventEntry = {
        isEvent: false,
        start: stringifyTime(event.date, time.start),
        end: stringifyTime(event.date, time.end),
        display: 'background',
        names: [],
        numbers: [],
      };
      for (const person of people) {
        const matchedDateAvail = person.timesAvailable.find(
          (el) => el.date === event.date
        );
        const isAvail = isAvailable(time, matchedDateAvail.times);
        if (isAvail) {
          newEventEntry.names.push(person.name);
          newEventEntry.numbers.push(person.number);
        }
      }
      splitAvails.push(newEventEntry);
    }
  }
  // remove empty fields
  splitAvails = splitAvails.filter((el) => {
    return el.names.length !== 0 && el.numbers.length !== 0;
  });
  return splitAvails;
};
