import {css, html, LitElement, property, PropertyValues} from 'lit-element';

import {translate} from "./utils/html.utils";
import {generateGrid} from "./generators/grid-generator";
import {computeDefaultRadius, Ring} from "./domain/ring";
import {getRadialMax, getRadialMin, Section} from "./domain/section";
import {generateEntries} from "./generators/entry-generator";
import {Segment} from "./domain/segment";
import {Entry, EntryStyle} from "./domain/entry";

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
      display: block;
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

  private rings: Ring[] = [];

  private sections: Section[] = [];

  private entries: Entry[] = [];

  render() {
    return html`
      <svg width="${this.diameter}" height="${this.diameter}">
        <g id="center" transform="${translate(this.diameter / 2, this.diameter / 2)}">
          ${generateGrid(this.rings, this.sections)}
          ${generateEntries(this.entries)}
        </g>
      </svg>
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
        index,
        radius: computeDefaultRadius(
          this.diameter,
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
        index: sectionIndex,
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
