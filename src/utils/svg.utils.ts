import {CartesianCoordinates} from "./math.utils";

export function translate(x: number, y: number) {
  return `translate(${x},${y})`;
}

export function generateArc(start: CartesianCoordinates, end: CartesianCoordinates, radius: number, flipHorizontally: boolean) {
  return flipHorizontally ?
    `M ${end.x} ${end.y} A ${radius} ${radius} 0 0 0 ${start.x} ${start.y}` :
    `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}
