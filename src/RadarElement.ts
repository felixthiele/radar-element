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

import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { translate } from './utils/svg.utils';
import { generateGrid } from './generators/grid-generator';
import { computeDefaultRadius, Ring } from './domain/ring';
import { getRadialMax, getRadialMin, Section } from './domain/section';
import { generateEntries } from './generators/entry-generator';
import { Segment } from './domain/segment';
import { Entry, EntryStyle } from './domain/entry';
import { generateTooltip } from './generators/tooltip-generator';

interface RingConfig {
  id: string;
  displayName: string;
  backgroundColor: string;
  headlineColor: string;
  entryStyle: EntryStyle;
}

interface SectionConfig {
  id: string;
  displayName: string;
}

export interface EntryConfig {
  id: string;
  labelShort: string;
  labelLong: string;
  sectionId: string;
  ringId: string;
  clickable?: boolean;
}

@customElement('radar-element')
export class RadarElement extends LitElement {
  static override styles = css`
    :host {
      display: flex;
    }

    svg {
      background-color: var(--radar-element-background-color, #fff);
      font-family: Arial;
    }

    .section {
      stroke: var(--radar-element-grid-color, #fff);
      stroke-width: 1px;
    }

    .section-heading {
      font-size: 16px;
      pointer-events: none;
      user-select: none;
      fill: var(--radar-element-section-color, #000);
    }

    .ring {
      stroke: var(--radar-element-grid-color, #fff);
      stroke-width: 1px;
    }

    .ring-heading {
      font-size: 20px;
      font-weight: bold;
      pointer-events: none;
      user-select: none;
    }

    .entry {
      user-select: none;
    }

    .tooltip-container {
      position: absolute;
      pointer-events: none;
      user-select: none;
      z-index: 1;
    }

    .tooltip {
      display: grid;
      background-color: var(--radar-element-tooltip-background-color, #fff);
      grid-template-rows: 15px 25px;
      grid-template-columns: 40px 150px;
      grid-column-gap: 5px;
      border-bottom-width: 5px;
      border-bottom-style: solid;
      border-bottom-color: var(--radar-element-tooltip-accent-color, #000);
      z-index: 1;
      box-shadow-x: 1px;
      box-shadow-y: 1px;
      box-shadow-blur: 19px;
      box-shadow-color: rgba(0, 0, 0, 0.3);
    }

    .tooltip-label {
      font-weight: bold;
      font-size: 15px;
      line-height: 21px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 10px;
      grid-column: 1 / -1;
      color: var(--radar-element-tooltip-label-color, #000);
    }

    .tooltip-section {
      color: var(--radar-element-tooltip-section-color, #000);
      font-size: 8px;
      text-transform: uppercase;
      align-self: end;
      padding-left: 10px;
      grid-column: 1 / -1;
    }
  `;

  /**
   * The diameter of the radar.
   */
  @property({ type: Number })
  diameter = 0;

  /**
   * The configuration for the rings of the radar.
   */
  @property({ type: Array, attribute: 'ring-configs' })
  ringConfigs: Array<RingConfig> = [];

  /**
   * The configuration for the sections of the radar.
   */
  @property({ type: Array, attribute: 'section-configs' })
  sectionConfigs: Array<SectionConfig> = [];

  /**
   * The configuration for the entries of the radar.
   */
  @property({ type: Array, attribute: 'entry-configs' })
  entryConfigs: Array<EntryConfig> = [];

  /**
   * The ID of the currently highlighted entry. Can be set by the user and will
   * make the element highlight the entry with the given ID. In case the user
   * moves her mouse over any entry of the radar, this will in turn become the
   * highlighted entry, which will be reflected in this property.
   */
  @property({ type: String, attribute: 'highlighted-entry-id', reflect: true })
  highlightedEntryId?: string;

  /**
   * The currently highlightedEntry. This is computed inside the `willUpdate()`
   * method based on the `highlightedEntryId`.
   * @private
   */
  @state()
  private highlightedEntry?: Entry;

  @state()
  private rings: Ring[] = [];

  @state()
  private sections: Section[] = [];

  @state()
  private entries: Entry[] = [];

  /**
   * Renders the html representation of the element.
   */
  override render() {
    return html`
      <svg width="${this.diameter}" height="${this.diameter}">
        <g
          id="center"
          transform="${translate(this.diameter / 2, this.diameter / 2)}"
        >
          ${generateGrid(this.rings, this.sections)}
          ${generateEntries(
            this.entries,
            this.highlightEntry.bind(this),
            this.unhighlightEntry.bind(this),
            this.clickEntry.bind(this)
          )}
        </g>
      </svg>
      <div id="tooltip-container" class="tooltip-container">
        ${this.highlightedEntry
          ? generateTooltip(this.highlightedEntry, this.diameter / 2)
          : ''}
      </div>
    `;
  }

  /**
   * Called after the properties have been updated but before `render` is called.
   * Is used to update the internal component state.
   *
   * @param _changedProperties a map containing the changed properties together
   * with their old values
   */
  override willUpdate(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has('ringConfigs') ||
      _changedProperties.has('sectionConfigs') ||
      _changedProperties.has('entryConfigs')
    ) {
      this.initializeRadar();
    }

    if (_changedProperties.has('highlightedEntryId')) {
      this.updateHighlightedEntry();
    }
  }

  /**
   * Initializes the rings, section and entries based on the configuration
   * provided by the user via properties
   * @private
   */
  private initializeRadar() {
    this.rings = [];
    this.sections = [];
    this.entries = [];

    this.ringConfigs.forEach((config, index) => {
      const ring: Ring = {
        ...config,
        radius: computeDefaultRadius(
          this.diameter - 40,
          this.ringConfigs.length,
          index
        ),
      };

      if (index > 0) {
        ring.previousRing = this.rings[index - 1];
      }

      this.rings.push(ring);
    });

    this.sectionConfigs.forEach((sectionConfig, sectionIndex) => {
      const section: Section = {
        ...sectionConfig,
        radialMin: getRadialMin(this.sectionConfigs.length, sectionIndex),
        radialMax: getRadialMax(this.sectionConfigs.length, sectionIndex),
      };

      this.sections.push(section);

      this.rings.forEach(ring => {
        const segment = new Segment(ring, section);

        this.entryConfigs
          .filter(e => e.sectionId === sectionConfig.id && e.ringId === ring.id)
          .sort((a, b) => a.labelLong.localeCompare(b.labelLong))
          .map(e => segment.generateEntry(e, ring.entryStyle))
          .forEach(e => this.entries.push(e));
      });
    });
  }

  /**
   * Computes the `highlightedEntry` based on the provided `highlightedEntryId`
   * @private
   */
  private updateHighlightedEntry() {
    this.highlightedEntry = this.entries.find(
      e => e.id === this.highlightedEntryId
    );
  }

  /**
   * Used internally to set the `highlightedEntryId` property and to dispatch
   * an `entry-mouseover`-event.
   * @param entry the entry to be highlighted
   * @private
   */
  private highlightEntry(entry: Entry) {
    this.highlightedEntryId = entry.id;
    const event = new CustomEvent('entry-mouseover', {
      detail: {
        entryId: entry.id,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Used internally to unset the `highlightedEntryId` property and to dispatch
   * an `entry-mouseout`-event.
   * @private
   */
  private unhighlightEntry() {
    this.highlightedEntryId = undefined;
    const event = new CustomEvent('entry-mouseout');
    this.dispatchEvent(event);
  }

  /**
   * Used internally to dispatch an `entry-click`-event.
   * @param entry the entry that was clicked
   * @private
   */
  private clickEntry(entry: Entry) {
    const event = new CustomEvent('entry-click', {
      detail: {
        entryId: entry.id,
      },
    });
    this.dispatchEvent(event);
  }
}
