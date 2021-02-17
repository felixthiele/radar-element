import {expect, fixture, html} from "@open-wc/testing";
import {generateGrid} from "../../src/generators/grid-generator";

describe('grid generator', () => {

  it('generates empty grid', async () => {
    const el = await fixture<SVGElement>(html`${generateGrid([], [])}`);

    expect(el).to.not.be.null;
    expect(el.tagName).to.equal("g");
    expect(el.children).to.be.empty;
  });

  it('sets grid as id', async () => {
    const el = await fixture<SVGElement>(html`${generateGrid([], [])}`);

    expect(el.id).to.equal("grid");
  });

  it('generates rings', async () => {
    const rings = [{
      name: "test",
      radius: 10,
      backgroundColor: "#fff",
      headlineColor: "#000",
      index: 0,
      entryStyle: {
        color: "",
        labelColor: "",
        tooltipStyle: {
          color: "",
          labelColor: ""
        }
      },
    }];

    const el = await fixture<SVGElement>(html`${generateGrid(rings, [])}`);
    expect(el).dom.to.equal(`
      <g id="grid">
        <circle class="ring" cx="0" cy="0" r="10" style="fill: #fff;"></circle>
        <text class="ring-heading" fill="#000" text-anchor="middle" y="30">test</text>
      </g>
    `)
  });
});
