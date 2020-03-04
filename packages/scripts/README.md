@staart/scripts
===============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@staart/scripts.svg)](https://npmjs.org/package/@staart/scripts)
[![Downloads/week](https://img.shields.io/npm/dw/@staart/scripts.svg)](https://npmjs.org/package/@staart/scripts)
[![License](https://img.shields.io/npm/l/@staart/scripts.svg)](https://github.com/staart/packages/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @staart/scripts
$ staart COMMAND
running command...
$ staart (-v|--version|version)
@staart/scripts/1.7.0 darwin-x64 node-v13.7.0
$ staart --help [COMMAND]
USAGE
  $ staart COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`staart build`](#staart-build)
* [`staart check`](#staart-check)
* [`staart controllers`](#staart-controllers)
* [`staart docs`](#staart-docs)
* [`staart help [COMMAND]`](#staart-help-command)
* [`staart increment`](#staart-increment)
* [`staart launch`](#staart-launch)
* [`staart start`](#staart-start)
* [`staart update [REPO]`](#staart-update-repo)

## `staart build`

build your Staart API app

```
USAGE
  $ staart build
```

_See code: [src/commands/build.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/build.ts)_

## `staart check`

check for Staart updates

```
USAGE
  $ staart check
```

_See code: [src/commands/check.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/check.ts)_

## `staart controllers`

setup Staart API app controller

```
USAGE
  $ staart controllers
```

_See code: [src/commands/controllers.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/controllers.ts)_

## `staart docs`

generate TypeDoc documentation site

```
USAGE
  $ staart docs
```

_See code: [src/commands/docs.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/docs.ts)_

## `staart help [COMMAND]`

display help for staart

```
USAGE
  $ staart help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `staart increment`

increment the package.json version

```
USAGE
  $ staart increment
```

_See code: [src/commands/increment.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/increment.ts)_

## `staart launch`

launch the Staart API app

```
USAGE
  $ staart launch
```

_See code: [src/commands/launch.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/launch.ts)_

## `staart start`

build and launch Staart API app

```
USAGE
  $ staart start
```

_See code: [src/commands/start.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/start.ts)_

## `staart update [REPO]`

update this app from the staart repo

```
USAGE
  $ staart update [REPO]

EXAMPLE
  $ staart update api
  Updating Staart...
```

_See code: [src/commands/update.ts](https://github.com/staart/packages/blob/v1.7.0/src/commands/update.ts)_
<!-- commandsstop -->
