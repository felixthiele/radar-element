import {expect} from '@open-wc/testing';

import {translate} from '../../src/utils/html.utils';

describe('html utils', () => {

  it('translates', async () => {
    expect(translate(5, 6)).to.equal("translate(5,6)");
  });

});
