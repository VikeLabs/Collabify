import { InvalidArguments } from '../calendarStrengthExceptions';
/**
 * isAvailable
 * @params {object} event
 * @params {object} avail
 * @return {boolean}
 */
export const isAvailable = (event, avail) => {
  if (event === undefined || avail === undefined) {
    throw new InvalidArguments('wrong format for `event` or `avail`');
  }

  if (
    typeof event.start !== 'number' ||
    typeof event.end !== 'number' ||
    typeof avail.start !== 'number' ||
    typeof avail.end !== 'number'
  ) {
    throw new TypeError(
      '`start` prop and `end` prop have to be of type number'
    );
  }

  return event.start >= avail.start && event.end <= avail.end;
};
