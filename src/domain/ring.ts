export interface Ring {
  index: number;
  radius: number;
  previousRing?: Ring;
  backgroundColor: string;
}

export function computeDefaultRadius(
  maxRadius: number,
  numRings: number,
  currentRing: number
): number {
  const ringThickness = maxRadius / 2 / numRings;
  return ringThickness * (currentRing + 1);
}
