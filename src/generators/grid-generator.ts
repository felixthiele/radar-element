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

import { svg } from 'lit-element';
import { Ring } from '../domain/ring';
import { Section } from '../domain/section';
import { toCartesian } from '../utils/math.utils';
import { generateArc } from '../utils/svg.utils';

function generateRing(ring: Ring) {
  return svg`<circle class="ring" cx="0" cy="0" r="${ring.radius}" style="fill: ${ring.backgroundColor};"></circle>`;
}

function generateRingHeading(ring: Ring) {
  return svg`<text class="ring-heading" y="${
    -ring.radius + 40
  }" text-anchor="middle" fill="${ring.headlineColor}">${
    ring.displayName
  }</text>`;
}

function generateSection(section: Section, maxRadius: number) {
  const outerPoint = toCartesian({
    t: section.radialMax,
    r: maxRadius,
  });
  return svg`<line class="section" x1="0" y1="0" x2="${outerPoint.x}" y2="${outerPoint.y}"></line>`;
}

function generateSectionHeading(section: Section, radius: number) {
  const middleAngle = (section.radialMax * 180 + section.radialMin * 180) / 2;
  const isBelowHorizon = middleAngle <= 180 && middleAngle > 0;

  const start = toCartesian({
    t: section.radialMin,
    r: radius,
  });
  const end = toCartesian({
    t: section.radialMax,
    r: radius,
  });

  return svg`
    <defs>
        <path id="path-section-${
          section.displayName
        }" fill="none" d="${generateArc(
    start,
    end,
    radius,
    isBelowHorizon
  )}"></path>
    </defs>

    <text class="section-heading" side="right" dy="${
      isBelowHorizon ? '10' : '0'
    }">
        <textPath startOffset="50%" text-anchor="middle" href="#path-section-${
          section.displayName
        }">${section.displayName}</textPath>
    </text>
  `;
}

export function generateGrid(rings: Ring[], sections: Section[]) {
  const maxRadius =
    rings && rings.length > 0 ? rings[rings.length - 1].radius : 0;

  return svg`
    <g id="grid">
      ${rings.reverse().map(ring => generateRing(ring))}
      ${sections.map(section => generateSection(section, maxRadius))}
      ${rings.reverse().map(ring => generateRingHeading(ring))}
      ${sections.map(section => generateSectionHeading(section, maxRadius + 5))}
    </g>
  `;
}
