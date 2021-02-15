import { html, fixture, expect } from '@open-wc/testing';

import { RadarElement } from '../src/RadarElement.js';
import '../radar-element.js';

describe('RadarElement', () => {
  it('generates basic SVG', async () => {
    const el = await fixture<RadarElement>(html`<radar-element></radar-element>`);

    expect(el.shadowRoot!.querySelector('svg')).to.not.be.null;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<RadarElement>(html`<radar-element></radar-element>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
