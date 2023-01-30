import moment from 'moment';

export class Time {
  private static hour = 60 * 60; // seconds
  private static minute = 60; // seconds

  public static toSecond(t: string): number {
    const time = moment(t);
    const hour = time.hour();
    const minute = time.minute();

    return hour * this.hour + minute * this.minute;
  }
}
