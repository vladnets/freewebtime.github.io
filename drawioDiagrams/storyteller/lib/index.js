'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsLayout = require('./components/Layout');

var _componentsLayout2 = _interopRequireDefault(_componentsLayout);

var _reactRedux = require('react-redux');

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var app = document.getElementById("reactroot");
_reactDom2['default'].render(_react2['default'].createElement(
    _reactRedux.Provider,
    { store: _state2['default'].store },
    _react2['default'].createElement(_componentsLayout2['default'], null)
), app);