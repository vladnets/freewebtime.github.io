'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _initialState = require('./initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

exports['default'] = {
    store: _store2['default'],
    initialState: _initialState2['default']
};
module.exports = exports['default'];