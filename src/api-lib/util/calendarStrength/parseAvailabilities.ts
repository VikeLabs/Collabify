import { Availability } from '@prisma/client';
import { dataSanitize } from './helpers/dataSanitize';
import { determineBackground } from './helpers/determineBackground';
import { isAvailable } from './helpers/isAvailable';
import { stringifyTime } from './helpers/stringifyTime';
import type { ParsedAvailabilities } from './types';

export const parseAvailabilities = (
  availabilities: Availability[]
): ParsedAvailabilities[] => {
  const [events, people] = dataSanitize(availabilities);
  const parseAvails: ParsedAvailabilities[] = []; // to be returned
  let highestNamesLength = 0;

  for (const event of events) {
    try {
      for (const time of event.times) {
        const newEventEntry: ParsedAvailabilities = {
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
        // Determining the highestNamesLength
        if (newEventEntry.names.length > highestNamesLength) {
          highestNamesLength = newEventEntry.names.length;
        }

        parseAvails.push(newEventEntry);
      }
    } catch (e) {
      console.error(`Exception caught while parsing event: ${event}`);
      console.error(e);
      console.error('Skipping to the next iteration');
      continue;
    }
  }
  // Determining background here because highestNamesLength is accurate
  for (const avail of parseAvails) {
    avail.backgroundColor = determineBackground(
      avail.names.length,
      highestNamesLength
    );
  }

  return parseAvails;
};
