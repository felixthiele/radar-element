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

import { Entry, ENTRY_DIAMETER, ENTRY_RADIUS, EntryStyle } from './entry';
import {
  getRandomBetween,
  PolarCoordinates,
  toCartesian,
} from '../utils/math.utils';
import { Ring } from './ring';
import { Section } from './section';

export class Segment {
  public entries: Entry[] = [];

  private readonly polarMin: PolarCoordinates;

  private readonly polarMax: PolarCoordinates;

  private readonly possiblePositions: PolarCoordinates[];

  constructor(public ring: Ring, public section: Section) {
    this.polarMin = {
      t: section.radialMin,
      r: ring?.previousRing?.radius || 20,
    };
    this.polarMax = {
      t: section.radialMax,
      r: ring.radius,
    };

    this.possiblePositions = this.computePossibleEntryPositions();
  }

  private computePossibleEntryPositions() {
    const possiblePositions: PolarCoordinates[] = [];
    const numRings = (this.polarMax.r - this.polarMin.r) / ENTRY_DIAMETER;
    for (let i = 0; i < numRings - 1; i++) {
      const currentRadius = i * ENTRY_DIAMETER + this.polarMin.r + ENTRY_RADIUS;
      const arcLength =
        currentRadius * (this.polarMax.t - this.polarMin.t) * Math.PI;
      const numCirclesOnRadius = arcLength / ENTRY_DIAMETER;

      for (let j = 0; j < numCirclesOnRadius - 1; j++) {
        possiblePositions.push({
          r: currentRadius,
          t:
            this.polarMin.t +
            (j * ENTRY_DIAMETER + ENTRY_RADIUS) / Math.PI / currentRadius,
        });
      }
    }
    return possiblePositions;
  }

  generateEntry(
    entryConfig: {
      id: string;
      labelShort: string;
      labelLong: string;
      link?: string;
    },
    style: EntryStyle
  ): Entry {
    const coordinates = toCartesian(this.claimPositionForPoint());
    const entry = {
      segment: this,
      ...entryConfig,
      style,
      ...coordinates,
    };
    this.entries.push(entry);
    return entry;
  }

  private claimPositionForPoint(): PolarCoordinates {
    const index = Math.floor(
      getRandomBetween(0, this.possiblePositions.length - 1)
    );
    const coordinates = this.possiblePositions[index];
    this.possiblePositions.splice(index, 1);
    return coordinates;
  }
}
