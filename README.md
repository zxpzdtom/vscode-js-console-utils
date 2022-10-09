## vscode-js-console-utils

## 将 vscode-js-console-utils 改为彩色

![](https://user-gold-cdn.xitu.io/2019/5/26/16af354bd6907bcc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

| 配置                           | 说明                                    | 默认值                                                                                                                                                                |
| ------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| console-utils.quote            | Double quotes (""), single quotes ('')  | `"`                                                                                                                                                                   |
| console-utils.showText         | Insert console with text                | `true`                                                                                                                                                                |
| console-utils.showLineNumber   | Insert line number                      | `true`                                                                                                                                                                |
| console-utils.icons            | The prefix of the log icon.             | `🍏,🍎,🍐,🍊,🍋,🍌,🍉,🍇,🍓,🍒,🍑,🥥,🥝,🍅,🍆,🥑,🥒,🌶,🌽,🥕,🥔,🥐,🍞,🥖,🧀,🥚,🥓,🍖,🌭,🍔,🍕,🥪,🌮,🍣,🥟,🍤,🍢,🍡,🍧,🍰,🎂,🍭,🍬,🍫,🍿,🍩,🍪,🌰,🍯,🥛,🥤,🍺,🍻,🍷,🥃` |
| console-utils.fontColors       | The prefix of the log font color.       | `#42b983,#33a5ff,#b03734,#2eafb0,#6ec1c2,#ed9ec7,#fca650,#3f7cff,#93c0a4,#ea7e5c,#f5ce50,#465975,#ffdd4d,#7f2b82,#4fff4B,#e41a6a`                                     |
| console-utils.backgroundColors | The prefix of the log background color. |                                                                                                                                                                       |
| console-utils.fontSize         | The font size of the log.               | `14`                                                                                                                                                                  |
| console-utils.logType          | Select the log type                     | `log`                                                                                                                                                                 |

## 掘金

[https://juejin.im/post/5cea3a2051882550d4173f13](https://juejin.im/post/5cea3a2051882550d4173f13)

Easily insert and remove console.log statements, by [@whtouche](https://twitter.com/whtouche)

![](https://i.imgur.com/0tiesd2.gif)

## Installing

This extension is available for free in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils)

## Usage

With selection:

- Highlight a variable (or really any text)
- Press Cmd+Shift+L
- The output (on a new line) will be: console.log('variable: ', variable);

Without selection:

- Press Cmd+Shift+L
- The output (on the same line) will be: console.log();

To remove console.logs:

- Press Cmd+Shift+D
- This will delete all console.log statements in the current document

## To Do

- Add support for other console.\* methods (warn, error, time, timeEnd, etc)
- Add ability to delete console.\* across project (currently just the open file)
- ~~When deleting console.\*, report how many were deleted~~, across how many files
- Allow configuration to only delete certain types of console.\* statements

## License

[MIT License](LICENSE)
