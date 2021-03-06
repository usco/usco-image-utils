'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bufferToPng;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bufferToPng(buffer, width, height, fileName) {
  function genOutput(inBuf, width, height) {
    var PNG = require('pngjs').PNG;
    var png = new PNG({ width: width, height: height });

    /*for (let i = 0; i < inBuf.length; ++i) {
      png.data[i] = inBuf[i]
    }*/
    // vertical flip

    for (var j = 0; j < height; ++j) {
      // from https://gist.github.com/bsergean
      for (var i = 0; i < width; ++i) {
        var k = j * width + i;
        var r = inBuf[4 * k];
        var g = inBuf[4 * k + 1];
        var b = inBuf[4 * k + 2];
        var a = inBuf[4 * k + 3];

        // let m = (height - j + 1) * width + i
        var m = (height - j) * width + i;
        png.data[4 * m] = r;
        png.data[4 * m + 1] = g;
        png.data[4 * m + 2] = b;
        png.data[4 * m + 3] = a;
      }
    }
    png.pack().pipe(_fs2.default.createWriteStream(fileName));
  }

  // this is just a helper
  function log(inBuf, width, height) {
    var channels = inBuf.length / 4;
    for (var i = 0; i < channels; ++i) {
      var r = inBuf[i * 4];
      var g = inBuf[i * 4 + 1];
      var b = inBuf[i * 4 + 2];
      var a = inBuf[i * 4 + 3];

      console.log(r, g, b, a);
      console.log('//');
    }
  }

  genOutput(buffer, width, height);
}