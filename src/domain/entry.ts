import {Segment} from "./segment";

export const ENTRY_RADIUS = 9;
export const ENTRY_DIAMETER = 2 * ENTRY_RADIUS;

export interface EntryStyle {
  color: string;
  labelColor: string;
}

export interface Entry {
  id: string;
  segment: Segment;
  labelShort: string;
  labelLong: string;
  x: number;
  y: number;
  link?: string;
  style: EntryStyle;
}




