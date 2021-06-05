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
