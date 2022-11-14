import { InvalidArguments } from './calendarStrengthExceptions';

export const parseEvents = (events) => {
  try {
    return events.map((event) => {
      return {
        start: event.time.start,
        end: event.time.end,
        display: 'block',
        title: event.title,
        description: event.description,
        backgroundColor: '#fb8500',
      };
    });
  } catch (e) {
    throw new InvalidArguments(
      `Failed to parse an events: ${events}. Uncaught exceptions: ${e.message}`
    );
  }
};
