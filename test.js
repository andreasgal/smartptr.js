var SmartPointer = require('./smartptr.js');

var finalized = false;

var ptr = SmartPointer(1377, function (x) {
  finalized = true;
});
global.gc();
ptr = null;
global.gc();

process.exit(finalized ? 0 : -1);
