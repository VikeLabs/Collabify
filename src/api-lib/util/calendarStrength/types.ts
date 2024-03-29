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

export interface TimeSlot {
  start: string;
  end: string;
  startStr: string;
  endStr: string;
}

export interface TimeObject {
  start: number;
  end: number;
}

export interface FormatDateData {
  date: number;
  times: TimeObject[];
}

export interface TimeAvailable {
  date: number;
  times: TimeObject;
}

export interface PersonInfo {
  name: string;
  number: string;
  timesAvailable: TimeAvailable[]; // TODO: update this type
}

export interface DateEntry {
  date: number;
  times: Set<number> | number[];
}
