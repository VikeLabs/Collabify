import { dataSanitize } from './helpers/dataSanitize';
import { determineBackground } from './helpers/determineBackground';
import { isAvailable } from './helpers/isAvailable';
import { stringifyTime } from './helpers/stringifyTime';

export const parseAvailabilities = (availabilities) => {
  const [events, people] = dataSanitize(availabilities);
  let parseAvails = []; // to be returned
  for (const event of events) {
    for (const time of event.times) {
      const newEventEntry = {
        start: stringifyTime(event.date, time.start),
        end: stringifyTime(event.date, time.end),
        display: 'background',
        backgroundColor: 'transparent',
        names: [],
        numbers: [],
      };
      for (const person of people) {
        const matchedDateAvail = person.timesAvailable.find(
          (el) => el.date === event.date
        );
        const isAvail = isAvailable(time, matchedDateAvail?.times);
        if (isAvail) {
          newEventEntry.names.push(person.name);
          newEventEntry.numbers.push(person.number);
        }
      }
      newEventEntry.backgroundColor = determineBackground(
        newEventEntry.names.length,
        people.length
      );
      parseAvails.push(newEventEntry);
    }
  }
  // remove empty fields
  parseAvails = parseAvails.filter((el) => {
    return el.names.length !== 0 && el.numbers.length !== 0;
  });
  return parseAvails;
};
