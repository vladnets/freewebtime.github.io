'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var mdAddType = function mdAddType(newType) {
  return {
    type: ActionTypes.MD_ADD_TYPE,
    payload: newType
  };
};

exports.mdAddType = mdAddType;
var mdRemoveType = function mdRemoveType(newType) {
  return {
    type: ActionTypes.MD_REMOVE_TYPE,
    payload: newType
  };
};
exports.mdRemoveType = mdRemoveType;