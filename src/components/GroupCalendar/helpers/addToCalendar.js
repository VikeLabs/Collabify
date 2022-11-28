import moment from 'moment';
import { v1 as uuidV1 } from 'uuid';

/**
 * @type event: {
 *   start: local time
 *   end: local time
 *   title: string
 *   details: string
 * }
 */
class AddToCalendar {
  startUTC = '';
  endUTC = '';
  title = '';
  details = '';

  duration = ''; // to be calculated

  constructor(event) {
    this.startUTC = this._localToUTC(event.start);
    this.endUTC = this._localToUTC(event.end);
    this.duration = this._getDuration(event.start, event.end);
    this.title = encodeURIComponent(event.title);
    this.details = encodeURIComponent(event.details);

    // Get duration for yahoo
    this.duration = this._getDuration(event.startStr, event.endStr);

    /* for debugging.
    console.log(
      this.startUTC,
      this.endUTC,
      this.duration,
      this.title,
      this.details
    ); 
    */
    //TODO: delete before prod
  }

  google() {
    let calendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
    calendarUrl += `?dates=${this.startUTC}/${this.endUTC}`;
    calendarUrl += `&text=${this.title}`;
    calendarUrl += `&details=${this.details}`;
    return calendarUrl;
  }

  outlookcom() {
    let calendarUrl = 'https://outlook.live.com/owa/?rru=addevent';
    calendarUrl += `&startdt=${this / this.startUTC}`;
    calendarUrl += `&enddt=${this.endUTC}`;
    calendarUrl += `&subject=${this.title}`;
    calendarUrl += `&body=${this.details}`;
    calendarUrl += '&allday=false';
    calendarUrl += '&uid=' + uuidV1();
    calendarUrl += '&path=/calendar/view/Month';
    return calendarUrl;
  }

  yahoo() {
    let calendarUrl = 'https://calendar.yahoo.com/?v=60&view=d&type=20';
    calendarUrl += `&title=${this.title}`;
    calendarUrl += `&st=${this.startUTC}`;
    calendarUrl += `&dur=${this.duration}`;
    calendarUrl += `&desc=${this.details}`;

    return calendarUrl;
  }

  apple() {
    let calendarUrl = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'PRODID:COLLABIFY WEB',
      `URL:${document.URL}`,
      `DTSTART:${this.startUTC}`,
      `DTEND:${this.endUTC}`,
      `SUMMARY:${this.title}`,
      `DESCRIPTION:${this.details}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    return encodeURI(`data:text/calendar;charset=utf8,${calendarUrl}`);
  }

  /* Private member helper functions */
  /**
   * NOTE: I can't enforce you _NOT_ to access these member functions without messing around
   * with babel, as of right now these functions are read-only so it is safe to do so, but
   * these may change as project grows and they could potentially become writting methods.
   * Should you need to access these externally for whatever the reason may be, please consult.
   * - Hal
   */
  _localToUTC(time) {
    const localTime = new Date(time);

    const utcYear = localTime.getUTCFullYear();
    const utcMonth = localTime.getUTCMonth() + 1; // needs to be added one since month starts with 0 in JS :/
    const utcDate = localTime.getUTCDate();

    let utcHour = localTime.getUTCHours();
    utcHour = String(utcHour).padStart(2, '0');

    let utcMinute = localTime.getUTCMinutes();
    utcMinute = String(utcMinute).padStart(2, '0');

    return `${utcYear}${utcMonth}${utcDate}T${utcHour}${utcMinute}00Z`;
  }

  _getDuration(startTime, endTime) {
    let end = moment.utc(endTime).format('DD/MM/YYYY HH:mm:ss');
    let start = moment.utc(startTime).format('DD/MM/YYYY HH:mm:ss');

    let difference = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(start, 'DD/MM/YYYY HH:mm:ss')
    );
    let duration = moment.duration(difference);

    return (
      Math.floor(duration.asHours()) + moment.utc(difference).format(':mm')
    );
  }
}

export { AddToCalendar };
