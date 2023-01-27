export class Time {
  private static hourInSec = 60 * 60;
  private static minInSec = 60;

  public static toNumber(time: string): number {
    const [hourStr, minSuff] = time.split(':');
    const [minStr, suffix] = minSuff.split(' ');

    const min = parseInt(minStr) * this.minInSec;
    let hour = parseInt(hourStr) * this.hourInSec;
    if (suffix === 'pm') hour += 12 * this.hourInSec;

    return hour + min;
  }

  public static toStr(seconds: number): string {
    let suffix = 'am';

    if (seconds >= 13 * this.hourInSec) {
      seconds = seconds - 12 * this.hourInSec;
      suffix = 'pm';
    }

    const hourNum = Math.floor(seconds / this.hourInSec);
    const minNum = (seconds % this.hourInSec) / this.minInSec;

    const minStr = minNum.toString().padStart(2, '0');

    return `${hourNum}:${minStr} ${suffix}`;
  }
}
