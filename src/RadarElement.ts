import {css, html, LitElement, property} from 'lit-element';

import {translate} from "./utils/html.utils";
import {generateGrid} from "./GridHtml.js";
import {computeDefaultRadius, Ring} from "./domain/ring.js";

interface RingConfig {
  name: string;
  backgroundColor: string;
}

export class RadarElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    svg {
      background-color: var(--radar-element-background-color, #fff)
    }
  `;

  /**
   * The diameter the radar should have.
   */
  @property() diameter = 0;

  /**
   * The configuration for the rings of the radar.
   */
  @property({type: Array}) ringConfig: Array<RingConfig> = [];

  private rings: Ring[] = [];

  render() {
    this.ringConfig.forEach((config, index) => {
      const ring: Ring = {
        ...config,
        index,
        radius: computeDefaultRadius(
          this.diameter,
          this.ringConfig.length,
          index
        ),
      };

      if (index > 0) {
        ring.previousRing = this.rings[index - 1];
      }

      this.rings.push(ring);
    })

    return html`
      <svg width="${this.diameter}" height="${this.diameter}">
        <g id="center" transform="${translate(this.diameter / 2, this.diameter / 2)}">
          ${generateGrid(this.rings)}
        </g>
      </svg>
    `;
  }

}
