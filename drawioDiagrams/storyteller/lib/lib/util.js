/* not bound to style, should be computed */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.computeInOffsetByIndex = computeInOffsetByIndex;
exports.computeOutOffsetByIndex = computeOutOffsetByIndex;

function computeInOffsetByIndex(x, y, index) {
	var outx = x + 15;
	var outy = y + 41 + index * 14;

	return { x: outx, y: outy };
}

function computeOutOffsetByIndex(x, y, index) {

	var outx = x + 165;
	var outy = y + 45 + index * 20;

	return { x: outx, y: outy };
}