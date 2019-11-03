[![Staart packages](https://raw.githubusercontent.com/staart/staart.js.org/master/assets/svg/packages.svg?sanitize=true)](https://staart.js.org)

This repository contains shared packages and resources that power the [Staart](https://github.com/o15y/staart) Node.js backend project.

|  | Status |
| - | - |
| Build | [![Travis CI](https://img.shields.io/travis/staart/packages?label=Travis%20CI)](https://travis-ci.org/staart/packages) [![Circle CI](https://img.shields.io/circleci/build/github/staart/packages?label=Circle%20CI)](https://circleci.com/gh/staart/packages) [![Azure Pipelines](https://dev.azure.com/staart/packages/_apis/build/status/staart.packages?branchName=master)](https://dev.azure.com/staart/packages/_build/latest?definitionId=6&branchName=master) |
| [`@staart/example`](https://github.com/staart/packages/tree/master/packages/example) | [![npm package version](https://img.shields.io/npm/v/@staart/example)](https://www.npmjs.com/package/@staart/example) [![npm](https://img.shields.io/npm/dw/@staart/example)](https://www.npmjs.com/package/@staart/example) |
| [`@staart/errors`](https://github.com/staart/packages/tree/master/packages/errors) | [![npm package version](https://img.shields.io/npm/v/@staart/errors)](https://www.npmjs.com/package/@staart/errors) [![npm](https://img.shields.io/npm/dw/@staart/errors)](https://www.npmjs.com/package/@staart/errors) |
| [`@staart/redis`](https://github.com/staart/packages/tree/master/packages/redis) | [![npm package version](https://img.shields.io/npm/v/@staart/redis)](https://www.npmjs.com/package/@staart/redis) [![npm](https://img.shields.io/npm/dw/@staart/redis)](https://www.npmjs.com/package/@staart/redis) |
| [`@staart/messages`](https://github.com/staart/packages/tree/master/packages/messages) | [![npm package version](https://img.shields.io/npm/v/@staart/messages)](https://www.npmjs.com/package/@staart/messages) [![npm](https://img.shields.io/npm/dw/@staart/messages)](https://www.npmjs.com/package/@staart/messages) |

## 🛠 Usage

This monorepository consists of custom packages that Staart projects depend on; you probably don't want to use individual packages. However, if you like, you can find the package you want on the [npm @staart organization](https://www.npmjs.com/org/staart).

### Development

Each package is written in TypeScript and can be built:

```bash
cd packages/example
yarn build
```

A [publish script](https://github.com/staart/packages/blob/master/scripts/publish.js) is used to build each package and publish it to the NPM registry.

## [🏁 Staart Ecosystem](https://staart.js.org)

The Staart ecosystem consists of open-source projects to build your SaaS startup, written in TypeScript.

| Package |  |  |
| - | - | - |
| [🛠️ Staart API](https://github.com/staart/api) | Node.js backend with RESTful APIs | [![Travis CI](https://img.shields.io/travis/staart/api)](https://travis-ci.org/staart/api) [![Docs](https://img.shields.io/endpoint?url=https%3A%2F%2Fstaart.js.org%2Fshield-schema%2Fapi.json)](https://staart.js.org/api) [![npm package version](https://img.shields.io/npm/v/@staart/manager)](https://www.npmjs.com/package/@staart/manager) |
| [🌐 Staart UI](https://github.com/staart/ui) | Frontend Vue.js Progressive Web App | [![Travis CI](https://img.shields.io/travis/staart/ui)](https://travis-ci.org/staart/ui) [![Docs](https://img.shields.io/endpoint?url=https%3A%2F%2Fstaart.js.org%2Fshield-schema%2Fui.json)](https://staart.js.org/ui) [![npm package version](https://img.shields.io/npm/v/@staart/ui)](https://www.npmjs.com/package/@staart/ui) |
| [📑 Staart Site](https://github.com/staart/site) | Static site generator for docs/helpdesk | [![Travis CI](https://img.shields.io/travis/staart/site)](https://travis-ci.org/staart/site) [![Docs](https://img.shields.io/endpoint?url=https%3A%2F%2Fstaart.js.org%2Fshield-schema%2Fsite.json)](https://staart.js.org/site) [![npm package version](https://img.shields.io/npm/v/@staart/site)](https://www.npmjs.com/package/@staart/site) |
| [📱 Staart Native](https://github.com/staart/native) | React Native app for Android and iOS | [![Travis CI](https://img.shields.io/travis/staart/native)](https://travis-ci.org/staart/native) [![Docs](https://img.shields.io/endpoint?url=https%3A%2F%2Fstaart.js.org%2Fshield-schema%2Fnative.json)](https://staart.js.org/native) [![npm package version](https://img.shields.io/npm/v/@staart/native)](https://www.npmjs.com/package/@staart/native) |
| [🎨 Staart.css](https://github.com/staart/css) | Sass/CSS framework and utilities | [![Travis CI](https://img.shields.io/travis/staart/css)](https://travis-ci.org/staart/css) [![Docs](https://img.shields.io/endpoint?url=https%3A%2F%2Fstaart.js.org%2Fshield-schema%2Fcss.json)](https://staart.js.org/css) [![npm package version](https://img.shields.io/npm/v/@staart/css)](https://www.npmjs.com/package/@staart/css) |

## 💝 Sponsors

The development of Staart projects is supported by these wonderful companies. [Find us on OpenCollective](https://opencollective.com/staart)

<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/OswaldLabsOpenSource"><img src="https://avatars3.githubusercontent.com/u/21421587?v=4" width="100px" alt=""/><br><sub><b>Oswald Labs</b></sub></a></td>
    <td align="center"><a href="https://github.com/O15Y"><img src="https://avatars3.githubusercontent.com/u/48348500?v=4" width="100px" alt=""/><br><sub><b>O15Y</b></sub></a></td>
    <td align="center"><a href="https://github.com/speakupnl"><img src="https://avatars3.githubusercontent.com/u/33686381?v=4" width="100px" alt=""/><br><sub><b>Speakup</b></sub></a></td>
  </tr>
</table>

## 📄 License

- Code: [MIT](https://github.com/staart/packages/blob/master/LICENSE)
- Logo and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
