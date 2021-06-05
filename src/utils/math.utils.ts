/*
 ** radar-element
 **
 ** Copyright (c) 2021 Felix Thiele (dev@felix-thiele.eu)
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a copy
 ** of this software and associated documentation files (the "Software"), to deal
 ** in the Software without restriction, including without limitation the rights
 ** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 ** copies of the Software, and to permit persons to whom the Software is
 ** furnished to do so, subject to the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included in all
 ** copies or substantial portions of the Software.
 **
 ** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 ** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 ** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 ** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 ** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 ** SOFTWARE.
 */

export interface PolarCoordinates {
  t: number;
  r: number;
}

export interface CartesianCoordinates {
  x: number;
  y: number;
}

export function toPolar(cartesian: CartesianCoordinates): PolarCoordinates {
  const { x, y } = cartesian;
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

let seed = 42;

function getRandom(): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getRandomBetween(min: number, max: number): number {
  return min + getRandom() * (max - min);
}
