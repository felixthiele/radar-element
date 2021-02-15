import {svg} from "lit-element";
import {Ring} from "./domain/ring.js";

export function generateGrid(rings: Ring[]) {
  return svg`
    <g id="grid">
      ${rings.reverse().map(ring => svg`
        <circle cx="0" cy="0" r="${ring.radius}" style="fill: ${ring.backgroundColor};"></circle>
      `)}
    </g>
  `;
}
