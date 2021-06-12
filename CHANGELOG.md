# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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