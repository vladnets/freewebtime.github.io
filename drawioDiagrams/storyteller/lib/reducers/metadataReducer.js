'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var reducer = function reducer(state, action) {
    if (state === undefined) state = { initialState: initialState };

    switch (action.type) {
        case _actions2['default'].Metadata:
            return _extends({}, state, { fetching: true });

        case "FETCH_USERS_FULFILLED":
            return _extends({}, state, { fetching: false, error: action.payload });

        case "FETCH_USERS_REJECTED":
            return _extends({}, state, {
                fetching: false,
                fetched: true,
                users: action.payload
            });
    }

    return state;
};

exports['default'] = reducer;
module.exports = exports['default'];