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

import { expect } from '@open-wc/testing';
import { generateArc, translate } from '../../src/utils/svg.utils';

describe('translate', () => {
  it('translates simple numbers', async () => {
    expect(translate(5, 6)).to.equal('translate(5,6)');
  });
});

describe('generateArc', () => {
  it('generates arc', async () => {
    const start = {
      x: 1,
      y: 2,
    };
    const end = {
      x: 3,
      y: 4,
    };
    expect(generateArc(start, end, 5, false)).to.equal('M 1 2 A 5 5 0 0 1 3 4');
  });

  it('generates horizontally flipped arc', async () => {
    const start = {
      x: 1,
      y: 2,
    };
    const end = {
      x: 3,
      y: 4,
    };
    expect(generateArc(start, end, 5, true)).to.equal('M 3 4 A 5 5 0 0 0 1 2');
  });
});
