smartptr
========

Node module for a smart pointer

## Usage

```javascript
var smartptr = require('smartptr');

function FileHandle(name) {
  var fd = _open(name);
  this.handle = smartptr(fd, function (fd) {
    _close(fd);
  });
}

FileHandle.prototype = {
  close: function () {
    this.handle.release();
  },
};

var file = new FileHandle(name);
file = null;
global.gc();
// _close() will be triggered automatically
```

## A word of caution

Smart pointers in JavaScript should be used very carefully. Relying on the GC to
manage resources is in almost all cases a bad idea in theory, but can be a real
life safer in practice.

You should make it a habit to release the smart pointer manually with release(),
but if you forget to do so, smartptr will have your back.

Its strongly discouraged to rely on this. Think of it as a safety net, not a
convenience.
