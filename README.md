### NPM-DEPENDENCY-HELL  

Packages in this group are "the finger in the dam" to dealing with npm errors for outdated / mismatched versions / abandoned dependencies.  If it's in here, it's because npm keeps throwing errors from some package that depends on some other package [repeat]

Changes to this package:
- Update ajv dependency
- Update tap dependency

```npm audit fix``` should resolve any other issues.  

---


# HAR Validator
originally by Ahmad Nassri https://github.com/ahmadnassri  
https://github.com/ahmadnassri/node-har-validator  

[![license][license-img]][license-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/thecarnie/node-har-validator


> Extremely fast HTTP Archive ([HAR](https://github.com/ahmadnassri/har-spec/blob/master/versions/1.2.md)) validator using JSON Schema.

## Install

```bash
npm install har-validator
```

## CLI Usage

Please refer to [`har-cli`](https://github.com/ahmadnassri/har-cli) for more info.
