export interface Group {
  id?: number;
  isPrivate: boolean;
  password?: string;
  privateToken?: string;
  name: string;
  description?: string;
  icon: string;
  calendarMinTime: string;
  calendarMaxTime: string;
}

export interface Event {
  id?: number;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  groupID: number;
}

export interface Availability {
  id?: number;
  groupID: number;
  weekOf: string;
  times: string[];
}

export interface User {
  id?: number;
  name: string;
  number: string;
}
