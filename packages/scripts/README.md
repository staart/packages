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
@staart/scripts/1.0.0 darwin-x64 node-v13.7.0
$ staart --help [COMMAND]
USAGE
  $ staart COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`staart check`](#staart-check)
* [`staart help [COMMAND]`](#staart-help-command)
* [`staart launch`](#staart-launch)
* [`staart update [REPO]`](#staart-update-repo)

## `staart check`

check for Staart updates

```
USAGE
  $ staart check
```

_See code: [src/commands/check.ts](https://github.com/staart/packages/blob/v1.0.0/src/commands/check.ts)_

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

## `staart launch`

launch the Staart API app

```
USAGE
  $ staart launch
```

_See code: [src/commands/launch.ts](https://github.com/staart/packages/blob/v1.0.0/src/commands/launch.ts)_

## `staart update [REPO]`

update this app from the staart repo

```
USAGE
  $ staart update [REPO]

EXAMPLE
  $ staart update api
  Updating Staart...
```

_See code: [src/commands/update.ts](https://github.com/staart/packages/blob/v1.0.0/src/commands/update.ts)_
<!-- commandsstop -->
