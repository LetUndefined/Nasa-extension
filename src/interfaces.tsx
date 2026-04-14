export interface People {
  craft: string;
  name: string;
}

export interface Astronauts {
  number: number;
  people: Array<People>;
}

export interface TelemetryData {
  label: string;
  unit: string;
  value: string;
  timestamp: string;
}
