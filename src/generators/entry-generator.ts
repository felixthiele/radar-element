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
import { styleMap } from 'lit-html/directives/style-map';
import { Entry } from '../domain/entry';
import { translate } from '../utils/svg.utils';

function generateEntry(entry: Entry) {
  const circleStyle = styleMap({
    fill: entry.style.color,
  });

  const textStyle = styleMap({
    fill: entry.style.labelColor,
    fontSize: '9px',
    textAnchor: 'middle',
  });

  return entry.link
    ? svg`
        <a href="${entry.link}" target="_blank">
            <circle r="9" style="${circleStyle}" "></circle>
            <text y="3" style="${textStyle}">${entry.labelShort}</text>
        </a>
    `
    : svg`
        <circle r="9" style="${circleStyle}"></circle>
        <text y="3" style="${textStyle}">${entry.labelShort}</text>
    `;
}

function generateEntryContainer(
  entry: Entry,
  highlightEntry: (selectedEntry: Entry) => void,
  unhighlightEntry: () => void
) {
  return svg`
    <g class="entry" id="entry-${entry.id}" transform="${translate(
    entry.x,
    entry.y
  )}" @mouseover="${() =>
    highlightEntry(entry)}" @mouseout="${unhighlightEntry}">
        ${generateEntry(entry)}
    </g>
  `;
}

export function generateEntries(
  entries: Entry[],
  highlightEntry: (entry: Entry) => void,
  unhighlightEntry: () => void
) {
  return svg`
    <g id="entries">
        ${entries.map(entry =>
          generateEntryContainer(entry, highlightEntry, unhighlightEntry)
        )}
    </g>
  `;
}
