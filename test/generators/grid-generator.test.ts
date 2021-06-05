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

import { expect, fixture, html } from '@open-wc/testing';
import { generateGrid } from '../../src/generators/grid-generator';

describe('grid generator', () => {
  it('generates empty grid', async () => {
    const el = await fixture<SVGElement>(html`${generateGrid([], [])}`);

    expect(el).to.not.be.null;
    expect(el.tagName).to.equal('g');
    expect(el.children).to.be.empty;
  });

  it('sets grid as id', async () => {
    const el = await fixture<SVGElement>(html`${generateGrid([], [])}`);

    expect(el.id).to.equal('grid');
  });

  it('generates rings', async () => {
    const rings = [
      {
        id: 'test',
        displayName: 'test',
        radius: 10,
        backgroundColor: '#fff',
        headlineColor: '#000',
        index: 0,
        entryStyle: {
          color: '',
          labelColor: '',
          tooltipStyle: {
            color: '',
            labelColor: '',
          },
        },
      },
    ];

    const el = await fixture<SVGElement>(html`${generateGrid(rings, [])}`);
    expect(el).dom.to.equal(`
      <g id="grid">
        <circle class="ring" cx="0" cy="0" r="10" style="fill: #fff;"></circle>
        <text class="ring-heading" fill="#000" text-anchor="middle" y="30">test</text>
      </g>
    `);
  });
});
