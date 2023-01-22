import { InvalidArguments } from './calendarStrengthExceptions';

export const parseEvents = (events) => {
  try {
    return events.map((event) => {
      return {
        title: event.title,
        start: event.time.start, // string
        end: event.time.end, // string
        description: event.description,
        display: 'block',
        backgroundColor: '#fb8500',
      };
    });
  } catch (e) {
    throw new InvalidArguments(
      `Failed to parse an events: ${events}. Uncaught exceptions: ${e.message}`
    );
  }
};
