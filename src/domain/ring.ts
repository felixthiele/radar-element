import {EntryStyle} from "./entry";

export interface Ring {
  id: string;
  displayName: string;
  radius: number;
  previousRing?: Ring;
  backgroundColor: string;
  headlineColor: string;
  entryStyle: EntryStyle;
}

export function computeDefaultRadius(
  maxRadius: number,
  numRings: number,
  currentRing: number
): number {
  const ringThickness = maxRadius / 2 / numRings;
  return ringThickness * (currentRing + 1);
}
