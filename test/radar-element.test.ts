import { html, fixture, expect } from '@open-wc/testing';

import { RadarElement } from '../src/RadarElement.js';
import '../radar-element.js';

describe('RadarElement', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<RadarElement>(html`<radar-element></radar-element>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<RadarElement>(html`<radar-element></radar-element>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<RadarElement>(html`<radar-element title="attribute title"></radar-element>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<RadarElement>(html`<radar-element></radar-element>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
