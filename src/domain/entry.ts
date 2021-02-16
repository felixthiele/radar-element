import { Segment } from "./segment";

export const ENTRY_RADIUS = 9;
export const ENTRY_DIAMETER = 2 * ENTRY_RADIUS;

export interface TooltipStyle {
  color: string;
  labelColor: string;
}

export interface EntryStyle {
  color: string;
  labelColor: string;
  tooltipStyle: TooltipStyle;
}

export interface Entry {
  id: number;
  segment: Segment;
  label: string;
  x: number;
  y: number;
  link?: string;
  style: EntryStyle;
}




