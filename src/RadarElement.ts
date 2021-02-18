import {css, html, LitElement, property, PropertyValues} from 'lit-element';

import {translate} from "./utils/svg.utils";
import {generateGrid} from "./generators/grid-generator";
import {computeDefaultRadius, Ring} from "./domain/ring";
import {getRadialMax, getRadialMin, Section} from "./domain/section";
import {generateEntries} from "./generators/entry-generator";
import {Segment} from "./domain/segment";
import {Entry, EntryStyle} from "./domain/entry";
import {generateTooltip} from "./generators/tooltip-generator";

interface RingConfig {
  name: string;
  backgroundColor: string;
  headlineColor: string;
  entryStyle: EntryStyle;
}

interface SectionConfig {
  name: string;
}

export interface EntryConfig {
  label: string;
  section: number;
  ring: number;
  link?: string;
}

export class RadarElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    svg {
      background-color: var(--radar-element-background-color, #fff);
      font-family: Arial;
    }

    .section {
      stroke: var(--grid-color, #fff);
      stroke-width: 1px;
    }

    .ring {
      stroke: var(--grid-color, #fff);
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
      background-color: #fff;
      grid-template-rows: 15px 25px;
      grid-template-columns: 40px 150px;
      grid-column-gap: 5px;
      border-bottom-width: 5px;
      border-bottom-style: solid;
      border-bottom-color: #841339;
      z-index: 1;
      box-shadow-x: 1px;
      box-shadow-y: 1px;
      box-shadow-blur: 19px;
      box-shadow-color: rgba(0,0,0,0.3);
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
    }

    .tooltip-section {
      color: #841339;
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
  @property() diameter = 0;

  /**
   * The configuration for the rings of the radar.
   */
  @property({type: Array}) ringConfigs: Array<RingConfig> = [];


  /**
   * The configuration for the sections of the radar.
   */
  @property({type: Array}) sectionConfigs: Array<SectionConfig> = [];

  /**
   * The configuration for the entries of the radar.
   */
  @property({type: Array}) entryConfigs: Array<EntryConfig> = [];

  /**
   * The currently highlighted entry.
   */
  @property({type: Object}) highlightedEntry?: Entry;

  private rings: Ring[] = [];

  private sections: Section[] = [];

  private entries: Entry[] = [];

  highlightEntry(entry: Entry) {
    this.highlightedEntry = entry;
  }

  unhighlightEntry() {
    this.highlightedEntry = undefined;
  }

  render() {
    return html`
      <svg width="${this.diameter}" height="${this.diameter}">
        <g id="center" transform="${translate(this.diameter / 2, this.diameter / 2)}">
          ${generateGrid(this.rings, this.sections)}
          ${generateEntries(this.entries, this.highlightEntry.bind(this), this.unhighlightEntry.bind(this))}
        </g>
      </svg>
      <div id="tooltip-container" class="tooltip-container">
        ${this.highlightedEntry ? generateTooltip(this.highlightedEntry, this.diameter / 2) : ""}
      </div>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

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
    })

    this.sectionConfigs.forEach((config, sectionIndex) => {
      const section: Section = {
        ...config,
        radialMin: getRadialMin(this.sectionConfigs.length, sectionIndex),
        radialMax: getRadialMax(this.sectionConfigs.length, sectionIndex),
      };

      this.sections.push(section);

      this.rings.forEach((ring, ringIndex) => {
        const segment = new Segment(ring, section);

        this.entryConfigs
          .filter((e) => e.section === sectionIndex && e.ring === ringIndex)
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((e) => segment.generateEntry(e, ring.entryStyle))
          .forEach((e) => this.entries.push(e));
      });
    });

    this.update(_changedProperties)
  }

}
