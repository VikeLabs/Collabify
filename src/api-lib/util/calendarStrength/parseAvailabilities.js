import { dataSanitize } from './helpers/dataSanitize';
import { determineBackground } from './helpers/determineBackground';
import { isAvailable } from './helpers/isAvailable';
import { stringifyTime } from './helpers/stringifyTime';

export const parseAvailabilities = (availabilities) => {
  const [events, people] = dataSanitize(availabilities);
  let parseAvails = []; // to be returned

  for (const event of events) {
    try {
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
          for (const personTime of person.timesAvailable) {
            if (personTime.date === event.date) {
              const isAvail = isAvailable(time, personTime.times);
              if (isAvail) {
                newEventEntry.names.push(person.name);
                newEventEntry.numbers.push(person.number);
              }
            }
          }
        }

        newEventEntry.backgroundColor = determineBackground(
          newEventEntry.names.length,
          people.length
        );

        parseAvails.push(newEventEntry);
      }
    } catch (e) {
      console.error(`Exception caught while parsing event: ${event}`);
      console.error(e);
      console.error('Skipping to the next iteration');
      continue;
    }
  }
  return parseAvails;
};
