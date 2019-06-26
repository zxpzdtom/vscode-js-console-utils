## vscode-js-console-utils

## 将 vscode-js-console-utils 改为彩色
![](https://user-gold-cdn.xitu.io/2019/5/26/16af354bd6907bcc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 掘金
[https://juejin.im/post/5cea3a2051882550d4173f13](https://juejin.im/post/5cea3a2051882550d4173f13)


Easily insert and remove console.log statements, by [@whtouche](https://twitter.com/whtouche)

![](https://i.imgur.com/0tiesd2.gif)

## Installing

This extension is available for free in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils)

## Usage

With selection:
* Highlight a variable (or really any text)
* Press Cmd+Shift+L
* The output (on a new line) will be: console.log('variable: ', variable);

Without selection:
* Press Cmd+Shift+L
* The output (on the same line) will be: console.log();

To remove console.logs:
* Press Cmd+Shift+D
* This will delete all console.log statements in the current document

## To Do
* Add support for other console.* methods (warn, error, time, timeEnd, etc)
* Add ability to delete console.* across project (currently just the open file)
* ~~When deleting console.*, report how many were deleted~~, across how many files
* Allow configuration to only delete certain types of console.* statements

## License
[MIT License](LICENSE)
