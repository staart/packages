[![Staart packages](https://raw.githubusercontent.com/staart/staart.js.org/master/assets/svg/packages.svg?sanitize=true)](https://staart.js.org)

This repository contains shared packages and resources that power the [Staart](https://github.com/o15y/staart) Node.js backend project.

|  | Status |
| - | - |
| Build | [![Travis CI](https://img.shields.io/travis/staart/packages?label=Travis%20CI)](https://travis-ci.org/staart/packages) [![Circle CI](https://img.shields.io/circleci/build/github/staart/packages?label=Circle%20CI)](https://circleci.com/gh/staart/packages) |
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
| [🛠️ Staart API](https://github.com/o15y/staart) | Node.js backend with RESTful APIs | [![Travis CI](https://img.shields.io/travis/o15y/staart)](https://travis-ci.org/o15y/staart) [![GitHub](https://img.shields.io/github/license/o15y/staart.svg)](https://github.com/o15y/staart/blob/master/LICENSE) [![npm package version](https://img.shields.io/npm/v/@staart/manager)](https://www.npmjs.com/package/@staart/manager) |
| [🌐 Staart UI](https://github.com/o15y/staart-ui) | Frontend Vue.js Progressive Web App | [![Travis CI](https://img.shields.io/travis/o15y/staart-ui)](https://travis-ci.org/o15y/staart-ui) [![GitHub](https://img.shields.io/github/license/o15y/staart-ui.svg)](https://github.com/o15y/staart-ui/blob/master/LICENSE) [![npm package version](https://img.shields.io/npm/v/@staart/ui)](https://www.npmjs.com/package/@staart/ui) |
| [📑 Staart Site](https://github.com/staart/site) | Static site generator for docs/helpdesk | [![Travis CI](https://img.shields.io/travis/staart/site)](https://travis-ci.org/staart/site) [![GitHub](https://img.shields.io/github/license/staart/site.svg)](https://github.com/staart/site/blob/master/LICENSE) [![npm package version](https://img.shields.io/npm/v/@staart/site)](https://www.npmjs.com/package/@staart/site) |
| [📱 Staart Native](https://github.com/o15y/staart-native) | React Native app for Android and iOS | [![Travis CI](https://img.shields.io/travis/o15y/staart-native)](https://travis-ci.org/o15y/staart-native) [![GitHub](https://img.shields.io/github/license/o15y/staart-native.svg)](https://github.com/o15y/staart-native/blob/master/LICENSE) [![npm package version](https://img.shields.io/npm/v/@staart/native)](https://www.npmjs.com/package/@staart/native) |
| [🎨 Staart.css](https://github.com/o15y/staart.css) | Sass/CSS framework and utilities | [![Travis CI](https://img.shields.io/travis/o15y/staart.css)](https://travis-ci.org/o15y/staart.css) [![GitHub](https://img.shields.io/github/license/o15y/staart.css.svg)](https://github.com/o15y/staart.css/blob/master/LICENSE) [![npm package version](https://img.shields.io/npm/v/@staart/css)](https://www.npmjs.com/package/@staart/css) |

## 📄 License

- Code: [MIT](https://github.com/staart/packages/blob/master/LICENSE)
- Logo and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
