'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hexToRgba = hexToRgba;
exports.normalizeRgba = normalizeRgba;
function hexToRgba(hex) {
  var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  var a = hex.length > 6 ? parseInt(hex.substring(6, 8), 16) : 255;
  var result = [r, g, b, a];
  return normalize ? normalizeRgba(result) : result;
}

// normalize 0-255 values to 0-1
function normalizeRgba(rgba) {
  return rgba.map(function (v) {
    return +(v / 255).toFixed(2);
  });
}