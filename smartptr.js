/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

var finalize = require('finalize');

function SmartPointer(ref, destructor) {
  if (!(this instanceof SmartPointer))
    return new SmartPointer(ref, destructor);
  this._ref = ref;
  this._destructor = destructor;
  finalize(this, function () {
    this.release();
  });
}

SmartPointer.prototype = {
  release: function () {
    if (!this._ref)
      return;
    this._destructor(this._ref);
    this._ref = null;
  },
  get raw() {
    return this._ref;
  },
  isNull() {
    return !this._ref;
  }
};

module.exports = SmartPointer;
