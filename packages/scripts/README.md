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
* [`staart hello [FILE]`](#staart-hello-file)
* [`staart help [COMMAND]`](#staart-help-command)

## `staart hello [FILE]`

describe the command here

```
USAGE
  $ staart hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ staart hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/staart/packages/blob/v1.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
