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

  /* BUG: try .. catch, since `avail` is sometimes undefined
   * Ideally `avail` should not be undefined at all..
   * I'm leaving this complicated looking piece of code
   * to do a very simple task here in case
   * it explodes the program in the future.
   * -Hal
   * */
  try {
    return event.start >= avail.start && event.end <= avail.end;
  } catch (e) {
    throw new InvalidArguments(e.message);
  }
};
