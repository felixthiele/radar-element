import {css, html, LitElement, property, PropertyValues} from 'lit-element';

import {translate} from "./utils/html.utils";
import {generateGrid} from "./generators/grid-generator";
import {computeDefaultRadius, Ring} from "./domain/ring";
import {getRadialMax, getRadialMin, Section} from "./domain/section";

interface RingConfig {
  name: string;
  backgroundColor: string;
}

interface SectionConfig {
  name: string;
}

export class RadarElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    svg {
      background-color: var(--radar-element-background-color, #fff)
    }

    .section {
      stroke: var(--grid-color, #fff)
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

  private rings: Ring[] = [];

  private sections: Section[] = [];

  render() {
    return html`
      <svg width="${this.diameter}" height="${this.diameter}">
        <g id="center" transform="${translate(this.diameter / 2, this.diameter / 2)}">
          ${generateGrid(this.rings, this.sections)}
        </g>
      </svg>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

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

    this.sectionConfigs.forEach((config, index) => {
      const section: Section = {
        ...config,
        index,
        radialMin: getRadialMin(this.sectionConfigs.length, index),
        radialMax: getRadialMax(this.sectionConfigs.length, index),
      };

      this.sections.push(section);
    });

    this.update(_changedProperties)
  }

}
