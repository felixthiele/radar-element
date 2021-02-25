export interface Section {
  displayName: string;
  radialMin: number;
  radialMax: number;
}

export function getRadialMin(
  numberSections: number,
  currentSection: number
): number {
  let result = (2 * (currentSection - 1)) / numberSections;
  if (numberSections % 2 !== 0) {
    result += 0.5;
  }
  return result;
}

export function getRadialMax(
  numberSections: number,
  currentSection: number
): number {
  let result = (2 * currentSection) / numberSections;
  if (numberSections % 2 !== 0) {
    result += 0.5;
  }
  return result;
}
