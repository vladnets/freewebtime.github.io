'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Navbar = require('react-bootstrap').Navbar;
var Header = require('react-bootstrap').Header;
var Brand = require('react-bootstrap').Brand;
var Nav = require('react-bootstrap').Nav;
var Toggle = require('react-bootstrap').Toggle;
var NavItem = require('react-bootstrap').NavItem;
var MenuItem = require('react-bootstrap').MenuItem;
var NavDropdown = require('react-bootstrap').NavDropdown;

var NavigationBar = (function (_Component) {
  _inherits(NavigationBar, _Component);

  function NavigationBar(props) {
    _classCallCheck(this, NavigationBar);

    _get(Object.getPrototypeOf(NavigationBar.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _createClass(NavigationBar, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        Navbar,
        { inverse: true, collapseOnSelect: true },
        _react2['default'].createElement(
          Navbar.Header,
          null,
          _react2['default'].createElement(
            Navbar.Brand,
            null,
            _react2['default'].createElement(
              'a',
              { href: '#' },
              'React-Bootstrap'
            )
          ),
          _react2['default'].createElement(Navbar.Toggle, null)
        ),
        _react2['default'].createElement(
          Navbar.Collapse,
          null,
          _react2['default'].createElement(
            Nav,
            null,
            _react2['default'].createElement(
              NavItem,
              { eventKey: 1, href: '#' },
              'Link'
            ),
            _react2['default'].createElement(
              NavItem,
              { eventKey: 2, href: '#' },
              'Link'
            ),
            _react2['default'].createElement(
              NavDropdown,
              { eventKey: 3, title: 'Dropdown', id: 'basic-nav-dropdown' },
              _react2['default'].createElement(
                MenuItem,
                { eventKey: 3.1 },
                'Action'
              ),
              _react2['default'].createElement(
                MenuItem,
                { eventKey: 3.2 },
                'Another action'
              ),
              _react2['default'].createElement(
                MenuItem,
                { eventKey: 3.3 },
                'Something else here'
              ),
              _react2['default'].createElement(MenuItem, { divider: true }),
              _react2['default'].createElement(
                MenuItem,
                { eventKey: 3.3 },
                'Separated link'
              )
            )
          ),
          _react2['default'].createElement(
            Nav,
            { pullRight: true },
            _react2['default'].createElement(
              NavItem,
              { eventKey: 1, href: '#' },
              'Link Right'
            ),
            _react2['default'].createElement(
              NavItem,
              { eventKey: 2, href: '#' },
              'Link Right'
            )
          )
        )
      );
    }
  }]);

  return NavigationBar;
})(_react.Component);

exports['default'] = NavigationBar;
module.exports = exports['default'];