import {svg} from "lit-element";
import {styleMap} from "lit-html/directives/style-map";
import {Entry} from "../domain/entry";
import {translate} from "../utils/svg.utils";

function generateEntry(entry: Entry) {
  const circleStyle = styleMap({
    fill: entry.style.color
  })

  const textStyle = styleMap({
    fill: entry.style.labelColor,
    fontSize: "9px",
    textAnchor: "middle"
  })

  return entry.link ? svg`
        <a href="${entry.link}" target="_blank">
            <circle r="9" style="${circleStyle}" "></circle>
            <text y="3" style="${textStyle}">${entry.labelShort}</text>
        </a>
    ` : svg`
        <circle r="9" style="${circleStyle}"></circle>
        <text y="3" style="${textStyle}">${entry.labelShort}</text>
    `;
}

function generateEntryContainer(entry: Entry, highlightEntry: (selectedEntry: Entry) => void, unhighlightEntry: () => void) {
  return svg`
    <g class="entry" id="entry-${entry.id}" transform="${translate(entry.x, entry.y)}" @mouseover="${() => highlightEntry(entry)}" @mouseout="${unhighlightEntry}">
        ${generateEntry(entry)}
    </g>
  `
}

export function generateEntries(entries: Entry[], highlightEntry: (entry: Entry) => void, unhighlightEntry: () => void) {
  return svg`
    <g id="entries">
        ${entries.map(entry => generateEntryContainer(entry, highlightEntry, unhighlightEntry))}
    </g>
  `

}
