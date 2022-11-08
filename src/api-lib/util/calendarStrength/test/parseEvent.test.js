import { describe, it, expect } from '@jest/globals';
import { parseEvents } from '../parseEvents';

const events = [
  {
    time: { startTime: '2022-10-28T09:00:00', endTime: '2022-10-28T13:00:00' },
    title: 'Event 1',
    description: 'Test',
  },
];

const expected = [
  {
    isEvent: true,
    start: '2022-10-28T09:00:00',
    end: '2022-10-28T13:00:00',
    display: 'block',
    title: 'Event 1',
    description: 'Test',
  },
];

describe('parseEvent() tests', () => {
  it('reformats events properly', () => {
    const output = parseEvents(events);
    expect(output).toStrictEqual(expected);
  });
});
