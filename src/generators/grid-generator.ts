import {svg} from "lit-element";
import {Ring} from "../domain/ring";
import {Section} from "../domain/section";
import {CartesianCoordinates, toCartesian} from "../utils/math.utils";

function generateSection(section: Section, maxRadius: number) {
  const outerPoint = toCartesian({
    t: section.radialMax,
    r: maxRadius
  })
  return svg`<line class="section" x1="0" y1="0" x2="${outerPoint.x}" y2="${outerPoint.y}"></line>`
}

function generateRing(ring: Ring) {
  return svg`<circle class="ring" cx="0" cy="0" r="${ring.radius}" style="fill: ${ring.backgroundColor};"></circle>`
}

function generateRingHeading(ring: Ring) {
  return svg`<text class="ring-heading" y="${-ring.radius + 40}" text-anchor="middle" fill="${ring.headlineColor}">${ring.name}</text>`
}

function generateArc(start: CartesianCoordinates, end: CartesianCoordinates, radius: number, flipHorizontally: boolean) {
  return flipHorizontally ?
    `M ${end.x} ${end.y} A ${radius} ${radius} 0 0 0 ${start.x} ${start.y}` :
    `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

function generateSectionHeading(section: Section, radius: number) {
  const middleAngle = (section.radialMax * 180 + section.radialMin * 180) / 2;
  const isBelowHorizon = middleAngle <= 180 && middleAngle > 0;

  const start = toCartesian({
    t: section.radialMin,
    r: radius
  });
  const end = toCartesian({
    t: section.radialMax,
    r: radius
  });

  return svg`
    <defs>
        <path id="path-section-${section.name}" fill="none" stroke="green" d="${generateArc(start, end, radius, isBelowHorizon)}"></path>
    </defs>

    <text class="section-heading" side="right" dy="${isBelowHorizon ? "10" : "0"}">
        <textPath startOffset="50%" text-anchor="middle" href="#path-section-${section.name}">${section.name}</textPath>
    </text>
  `;
}

export function generateGrid(rings: Ring[], sections: Section[]) {
  const maxRadius = rings && rings.length > 0 ? rings[rings.length - 1].radius : 0;

  return svg`
    <g id="grid">
      ${rings.reverse().map(ring => generateRing(ring))}
      ${sections.map((section) => generateSection(section, maxRadius))}
      ${rings.reverse().map(ring => generateRingHeading(ring))}
      ${sections.map((section) => generateSectionHeading(section, maxRadius + 5))}
    </g>
  `
}
