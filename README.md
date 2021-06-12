# \<radar-element>
This web-component shall give users an easy and highly configurable way of creating their own tech-, trend- or ...-radar. 

You may customize the number, styling and name of rings, the number and name of the sections and add entries to those sections. Additionally, your host-application can set the highlighted entry from outside (making the radar-element show a tooltip) and be informed via an event, whenever the user mouses over an entry.

<p>
  <img src="https://raw.githubusercontent.com/felixthiele/radar-element/main/docs/radar-element.png" width="49%" alt="A TechRadar showing 4 entries in the languages section with a tooltip showing for the entry Kotlin" />
  <img src="https://raw.githubusercontent.com/felixthiele/radar-element/main/docs/radar-element-dark.png" width="49%" alt="The same radar but in dark mode color palette"/> 
</p>

The web-component follows the [open-wc](https://github.com/open-wc/open-wc) recommendations.

## Installation
```bash
npm i radar-element
```

## Usage

<details>
<summary>Native HTML & JS</summary>

```html
<script type="module">
  import 'radar-element';  
</script>

<radar-element diameter="800"></radar-element>

<script>
  const rings = JSON.stringify([...]);
  const sections = JSON.stringify([...]);
  const entries = JSON.stringify([...]);

  const radar = document.getElementsByTagName("radar-element")[0];

  radar.setAttribute("ring-configs", rings);
  radar.setAttribute('section-configs', sections);
  radar.setAttribute('entry-configs', entries);

  radar.addEventListener('entry-mouseover', function(e) {...})
  radar.addEventListener('entry-mouseout', function() {...});
</script>
```
</details>

<details>
<summary>Angular</summary>

To include this element in e.g. an Angular project, you must first import it into your Angular component and define the properties:

```javascript
import 'radar-element';
import { Component } from '@angular/core';

@Component({
  ...
})
export class AppComponent {
  title = 'test';

  rings = [...];

  sections = [...];

  entries = [...];

  onHighlightEntry() {
    ...
  }

  onUnhighlightEntry() {
    ...
  }
}
```

Next you simple instantiate the element in the HTML and pass the properties / event-bindings:
```html
<radar-element 
  diameter="800"
  [ringConfigs]="rings"
  [sectionConfigs]="sections"
  [entryConfigs]="entries"
  (entry-mouseover)="onHighlightEntry()"
  (entry-mouseout)= "onUnhighligthEntry()">
</radar-element>
```

To make Angular understand this component you'll have to add the following to your module:
```javascript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  ...
})
```
</details>

<details>
<summary>lit-html</summary>

Another example on how to use this element via lit-html can be found in `demo/index.html`.
</details>

### Properties
All properties can be converted to attributes by going from camelCase (e.g. ringConfig) to kebap-case (e.g. ring-config). Properties can be bound by applications like Angular or lit-html, while Attributes have to be used in native HTML.

#### diameter
The diameter of the whole SVG.

#### ringConfig (ring-config)

```json
{
  "id": "adopt",
  "displayName": "ADOPT",
  "backgroundColor": "#841339",
  "headlineColor": "#fff",
  "entryStyle": {
    "color": "#fff",
    "labelColor": "#000"
  }
}
```

| Parameter         | Data-Type     | Description                                                                                       |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| id                | `string`      | The id of the ring                                                                                |
| displayName       | `string`      | The name of the ring that should be displayed                                                     |
| backgroundColor   | `string`      | The background color that should be used for the individual ring                                  |
| headlineColor     | `string`      | The color of the headline. Make sure that it has enough contrast to the ring's *backgroundColor*  |
| entryStyle        | `{}`          | The styling of the entries belonging to that ring

The `entryStyle` exhibits the following config-parameters:

| Parameter         | Data-Type     | Description                                                                                       |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| color             | `string`      | The color of the entry's circle                                                                   |
| labelColor        | `string`      | The color of the entry's label                                                                    |

#### sectionConfig (section-config)

```json
{
  "id": "languages",
  "displayName": "Languages"  
}
```

| Parameter         | Data-Type     | Description                                                         |
| ----------------- | ------------- | ------------------------------------------------------------------- |
| id                | `string`      | The id of the section                                               |
| displayName       | `string`      | The name of the section that should be displayed                    | 

#### entryConfig (entry-config)

```json
{
  "id": "73bef846-9177-4d48-b8d6-dcaa79dbaa28",
  "labelShort": "1",
  "labelLong": "TypeScript",
  "sectionId": "languages",
  "ringId": "adopt",
  "link": "https://www.typescriptlang.org/"
}
```

| Parameter         | Data-Type     | Description                                                         |
| ----------------- | ------------- | ------------------------------------------------------------------- |
| id                | `string`      | The id of the entry                                                 |
| labelShort        | `string`      | The character that should be printed on the entries circle.         |
| labelLong         | `string`      | The label of the entry                                              |
| sectionId         | `string`      | The id of the section that entry belongs to                         |
| ringId            | `string`      | The id of the ring that entry belongs to                            |
| link              | `string`      | A link the user shall be redirected to, when clicking on the entry  |

#### entry-mouseover & -mouseout
The radar-element will fire the `entry-mouseover` event whenever the mouse is placed above on entry and the tooltip appears. The event will contain the following data-structure:

```Javascript
detail: {
  entryId: "The ID of the entry that has been passed in through the entry-config"
}
```

This can be used to e.g. synchronize the highlighting with another structure outside of the radar-element.

The `entry-mouseout` event will be fired, whenever the entry is not highlighted anymore and does not contain any detail payload.

### CSS properties
The following css properties can be used to style the radar.

| Parameter                                   | Data-Type     | Description                               |
| ------------------------------------------- | ------------- | ----------------------------------------- |
| --radar-element-background-color            | `Color`       | The background color of the radar.        |
| --radar-element-grid-color                  | `Color`       | The color of the grid of the radar.       |
| --radar-element-section-color               | `Color`       | The color of the section label.           |
| --radar-element-tooltip-background-color    | `Color`       | The background color of the tooltip.      |
| --radar-element-tooltip-accent-color        | `Color`       | The color of the tooltips bottom border.  |
| --radar-element-tooltip-label-color         | `Color`       | The color of the tooltips label.          |
| --radar-element-tooltip-section-color       | `Color`       | The color of the tooltips section label.  |

## Development
### Overview
The whole application is designed to be lightweight and that it must integrate easily in all different kinds of applications. 
Therefore, we chose the web-components standard for implementation.  

#### Domain
When drawing a radar we split the whole circle into different parts, mainly *rings* and *sections*.

A *ring* depicts the maturity (or whatever scale the user of the radar chooses) while *sections* partition the entries into categories.
We call the overlap between a *ring* and *section* a *segment*. On those segments we position the *entries*.

#### Structure
The application is structured as follows:

```
/
  /demo
    /index.html - a simple page to integrate the element to for testing purposes
  /src
    /domain - contains the domain objects 
    /generators - contains pure functions that generate SVG or HTML code based on input parameters
    /utils - basic math and svg utilities
    /RadarElements.ts - the backing class for the web component implementation
  test
    /generators - contains tests for the generators
    /utils - contains tests for the utils
    /radar-element.ts - contains test for the web-component
/index.ts - the entry point if this whole package is included via npm
```
Some standard files (like `LICENSE`, or `package.json`) are omitted for brevity. 

### Run locally with with `web-dev-server`
Install dependencies

```bash
npm install
```

Run the server

```bash
npm start
```
This will serve the basic demo located in `demo/index.html`.

### Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

### Testing with `web-test-runner`
To run the suite of Web Test Runner tests, run
```bash
npm run test
```

To run the tests in watch mode run

```bash
npm run test:watch
```

### Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

## License
MIT License

Copyright (c) 2021 Felix Thiele (dev@felix-thiele.eu)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.