export interface PolarCoordinates {
  t: number;
  r: number;
}

export interface CartesianCoordinates {
  x: number;
  y: number;
}

export function toPolar(cartesian: CartesianCoordinates): PolarCoordinates {
  const {x, y} = cartesian;
  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y),
  };
}

export function toCartesian(polar: PolarCoordinates): CartesianCoordinates {
  const normalized =
    (polar.t > 0 ? polar.t : polar.t - Math.floor(0.5 * polar.t) * 2) * Math.PI;
  return {
    x: polar.r * Math.cos(normalized),
    y: polar.r * Math.sin(normalized),
  };
}
