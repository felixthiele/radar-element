import {html} from "lit-element";
import {Entry} from "../domain/entry";

export function generateTooltip(entry: Entry, offset: number) {
  return html`
    <div id="tooltip" class="tooltip" style="transform: translate(${entry.x + offset}px, ${entry.y + offset}px)">
      <div class="tooltip-section">${entry.segment.section.displayName}</div>
      <div class="tooltip-label">${entry.labelLong}</div>
    </div>
  `;
}
