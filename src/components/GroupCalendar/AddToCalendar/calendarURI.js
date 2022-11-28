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
class CalendarURI {
  startUTC = '';
  endUTC = '';
  title = '';
  details = '';

  // Yahoo requires duration instead of endtime
  duration = ''; // to be calculated

  // iCal does not need to be encoded
  iCalTitle = '';
  iCalDetails = '';

  constructor(event) {
    this.startUTC = this._localToUTC(event.start);
    this.endUTC = this._localToUTC(event.end);
    this.duration = this._getDuration(event.start, event.end);
    this.title = encodeURIComponent(event.title);
    this.details = encodeURIComponent(event.details);

    // Yahoo
    this.duration = this._getDuration(event.startStr, event.endStr);

    // iCal
    this.iCalTitle = event.title;
    this.iCalDetails = event.details;
  }

  google() {
    let calendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
    calendarUrl += `?dates=${this.startUTC}/${this.endUTC}`;
    calendarUrl += `&text=${this.title}`;
    calendarUrl += `&details=${this.details}`;
    return calendarUrl;
  }

  outlook() {
    let calendarUrl = 'https://outlook.live.com/owa/?rru=addevent';
    calendarUrl += `&startdt=${this.startUTC}`;
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
    const calendarUrl = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'PRODID:COLLABIFY WEB',
      `URL:${document.URL}`,
      `DTSTART:${this.startUTC}`,
      `DTEND:${this.endUTC}`,
      `SUMMARY:${this.iCalTitle}`,
      `DESCRIPTION:${this.iCalDetails}`,
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
    const end = moment.utc(endTime).format('DD/MM/YYYY HH:mm:ss');
    const start = moment.utc(startTime).format('DD/MM/YYYY HH:mm:ss');

    const difference = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(start, 'DD/MM/YYYY HH:mm:ss')
    );
    const duration = moment.duration(difference);

    return (
      Math.floor(duration.asHours()) + moment.utc(difference).format(':mm')
    );
  }
}

export { CalendarURI };
