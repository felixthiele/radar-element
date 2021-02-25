# \<radar-element>
This web-component shall give users an easy and configurable way of creating their own tech-, trend- or ...-radar. The web-component follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i radar-element
```

## Usage
```html
<script type="module">
  import 'radar-element/radar-element.js';
</script>

<radar-element diameter="800" [ringConfigs]="rings" [sectionConfigs]="sections" [entryConfigs]="entries"></radar-element>
```

In the example we have used the Angular notation for binding directly to properties. For a binding via native html the arrays have to be converted via `JSON.stringify()`.

## Configuration

### Properties
#### ring-config

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

The *entryStyle* exhibits the following config-parameters:

| Parameter         | Data-Type     | Description                                                                                       |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| color             | `string`      | The color of the entry's circle                                                                   |
| labelColor        | `string`      | The color of the entry's label                                                                    |


#### section-config

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

#### entry-config

```json
{
  "label": "TypeScript",
  "sectionId": "languages",
  "ringId": "adopt",
  "link": "https://www.typescriptlang.org/"
}
```

| Parameter         | Data-Type     | Description                                                         |
| ----------------- | ------------- | ------------------------------------------------------------------- |
| label             | `string`      | The label of the entry                                              |
| sectionId         | `number`      | The id of the section that entry belongs to                         |
| ringId            | `number`      | The id of the ring that entry belongs to                            |
| link              | `string`      | A link the user shall be redirected to, when clicking on the entry  |


### CSS properties
The following css properties can be used to style the radar.

| Parameter                         | Data-Type     | Description                           |
| --------------------------------- | ------------- | ------------------------------------- |
| --radar-element-background-color  | `Color`       | The background color of the radar.    |
| --grid-color                      | `Color`       | The color of the grid of the radar.   |
| --tooltip-background-color        | `Color`       | The background color of the tooltip.  |


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
../demo
..../index.html - a simple page to integrate the element to for testing purposes
../src
..../domain - contains the domain objects 
..../generators - contains pure functions that generate SVG or HTML code based on input parameters
..../utils - basic math and svg utilities
..../RadarElements.ts - the backing class for the web component implementation
../test
..../generators - contains tests for the generators
..../utils - contains tests for the utils
..../radar-element.ts - contains test for the web-component
/custom-elements.json - custom element manifest file
/index.ts - the entry point if this whole package is included via npm
/radar-element.ts - wrapper code for importing the backing class and registering it as a custom element
```
Some standard files (like `LICENSE`, or `package.json`) are omitted for brevity. 

### Local Demo with `web-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`


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

### Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
npm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
npm run test:watch
```


### Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

