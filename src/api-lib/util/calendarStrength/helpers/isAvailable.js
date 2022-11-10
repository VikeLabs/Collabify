/**
 * isAvailable
 * @params {object} event
 * @params {object} avail
 * @return {boolean}
 */
export const isAvailable = (event, avail) => {
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
    const errMsg = `isAvailable() encounters an error while parsing the object ${event}: ${e}`;
    console.error(errMsg);
    return false;
  }
};
