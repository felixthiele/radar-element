# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2022-10-05

Version 3.0.0 fixes the `highlightedEntry` property, which was not working correctly by replacing it with a `highlightedEntryId`property.
This, and the fact that the underlying framework for creating this element was replaced, is reflected in this major version increase.

### Changed
- replaced `highlightedEntry` property by `highlightedEntryId` property, allowing the user to set the highlighted entry from outside
- replaced `lit-element` by the newer [lit](https://lit.dev) and cleaned up lit lifecycle
- updated dev-dependencies and typescript compiler to newest versions

### Added
- GitHub-Workflow for Pull-Requests

## [2.0.2] - 2022-06-11

### Security
- updated `minimist` dependency (CVE-2021-44906)
- updated `semver-regex`dependency (CVE-2021-3795, CVE-2021-43307)
- updated `node-fetch`dependency (CVE-2022-0235)
- updated `chalk/ansi-regex`dependency (CVE-2021-3807)
- updated `async` dependency (CVE-2021-43138)

## [2.0.1] - 2021-08-14

### Security
- updated `path-parse` dependency (CVE-2021-23343)

## [2.0.0] - 2021-07-25

### Added
- optional `clickable` property of entries makes radar-element emit an `entry-click`event, whenever an entry is clicked


### Removed
- `link` property of entries, please mark entries as `clickable` instead and provide and event-listener instead

## [1.0.1] - 2021-06-13
### Fixed
- The default color for `--radar-element-section-color` is now black and thus can be seen on the default white background

## [1.0.0] - 2021-06-12
### Added
- CSS property for changing the color of the section label (`--radar-element-section-color`)
- CSS properties to style the tooltips color (`--radar-element-tooltip-accent-color`, `--radar-element-tooltip-label-color` and `--radar-element-tooltip-section-color`)
- README descriptions on properties vs. attributes and how to use the element in native HTML without a framework

### Changed
- Renamed events to better align with future development (`entry-highlighted` to `entry-mouseover` and `entry-unhighlighted` to `entry-mouseout`)
- Made all CSS properties start with `radar-element`

### Fixed
- ESlint integration

## [0.9.2] - 2021-06-12
### Fixed
- add tslib to dependencies so that it will be resolved in empty html project
- corrected image display on npm-registry README

### Security
- updated @open-wc/eslint-config to fix a vulnerability

## [0.9.1] - 2021-06-11
### Fixed
- removed unnecessary folders from published npm package
- fixed errors in README.md regarding usage and event-names

## [0.9.0] - 2021-06-11
### Added
- initial implementation of the radar-element
- tooltip for each entry
- entry-highlighted event
