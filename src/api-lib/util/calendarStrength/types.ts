// {
//   weekOf: '2022-10-30',
//   times: [
//     {
//       startStr: '2022-10-30T09:30:00',
//       endStr: '2022-10-30T11:00:00',
//     },
//     {
//       startStr: '2022-10-31T13:30:00',
//       endStr: '2022-10-31T17:00:00',
//     },
//     {
//       startStr: '2022-11-01T08:00:00',
//       endStr: '2022-11-01T16:30:00',
//     },
//   ],
//   name: 'Ben',
//   number: '125',
// },

interface Time {
  start: string; // '2022-10-30T09:30:00'
  end: string; // '2022-10-30T09:30:00'
}

export interface ParsedAvailabilities extends Time {
  display: 'background';
  names: string[];
  numbers: string[]; // [ '250 123-4567', '123 345 4566']
  backgroundColor: string;
}
