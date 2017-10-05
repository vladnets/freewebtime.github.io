'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _metadataReducer = require('./metadataReducer');

var _metadataReducer2 = _interopRequireDefault(_metadataReducer);

exports['default'] = (0, _redux.combineReducers)({
    metadata: _metadataReducer2['default']
});
module.exports = exports['default'];
//other reducer