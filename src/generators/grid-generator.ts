import {svg} from "lit-element";
import {Ring} from "../domain/ring";
import {Section} from "../domain/section";
import {toCartesian} from "../utils/math.utils";

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

export function generateGrid(rings: Ring[], sections: Section[]) {
  const maxRadius = rings[rings.length - 1].radius;
  return svg`
    <g id="grid">
      ${rings.reverse().map(ring => generateRing(ring))}
      ${sections.map((section) => generateSection(section, maxRadius))}
    </g>
  `
}
