"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _redux = require("redux");

var _reduxLogger = require('redux-logger');

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reduxPromiseMiddleware = require('redux-promise-middleware');

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var logger = (0, _reduxLogger.createLogger)({ logErrors: true, duration: true, timestamp: true });
var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2["default"])(), _reduxThunk2["default"], logger);

exports["default"] = (0, _redux.createStore)(_reducers2["default"], middleware);
module.exports = exports["default"];