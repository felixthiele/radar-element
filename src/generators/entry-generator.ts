import {svg} from "lit-element";
import {Entry} from "../domain/entry";
import {translate} from "../utils/html.utils";

function generateEntry(entry: Entry) {
  return entry.link ? svg`
        <a href="${entry.link}" target="_blank">
            <circle r="9" fill="${entry.style.color}"></circle>
            <text y="3" text-anchor="middle">${entry.id}</text>
        </a>
    ` : svg`
        <circle r="9" fill="${entry.style.color}"></circle>
        <text y="3" text-anchor="middle">${entry.id}</text>
    `;
}

function generateEntryContainer(entry: Entry) {
  return svg`
    <g class="entry" id="entry-${entry.id}" transform="${translate(entry.x, entry.y)}">
        ${generateEntry(entry)}
    </g>
  `
}

export function generateEntries(entries: Entry[]) {
  return svg`
    <g id="entries">
        ${entries.map(entry => generateEntryContainer(entry))}
    </g>
  `

}
