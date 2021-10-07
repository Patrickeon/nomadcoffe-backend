"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var firstname, lastName, username, email, password, location, avatar, githubUsername, existingUser, uglyPassword;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstname = _ref.firstname, lastName = _ref.lastName, username = _ref.username, email = _ref.email, password = _ref.password, location = _ref.location, avatar = _ref.avatar, githubUsername = _ref.githubUsername;
                _context.prev = 1;
                console.log("test");
                _context.next = 5;
                return _client["default"].user.findFirst({
                  where: {
                    OR: [{
                      username: username
                    }, {
                      email: email
                    }, {
                      githubUsername: githubUsername
                    }]
                  }
                });

              case 5:
                existingUser = _context.sent;
                console.log(existingUser);

                if (!existingUser) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "이미 존재하는 회원입니다."
                });

              case 9:
                _context.next = 11;
                return _bcrypt["default"].hash(password, 10);

              case 11:
                uglyPassword = _context.sent;
                _context.next = 14;
                return _client["default"].user.create({
                  data: {
                    username: username,
                    email: email,
                    firstname: firstname,
                    lastName: lastName,
                    password: uglyPassword,
                    location: location,
                    avatar: avatar,
                    githubUsername: githubUsername
                  }
                });

              case 14:
                return _context.abrupt("return", {
                  ok: true,
                  error: ""
                });

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  ok: false,
                  error: _context.t0
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 17]]);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }
};
exports["default"] = _default;