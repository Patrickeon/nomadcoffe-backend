"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _coffes = require("../coffes.utils");

var _default = {
  Mutation: {
    editCoffeeShop: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, name, latitude, longitude, categories, loggedInUser, oldCoffeShop;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, name = _ref.name, latitude = _ref.latitude, longitude = _ref.longitude, categories = _ref.categories;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].coffeeShop.findFirst({
                  where: {
                    id: id,
                    userId: loggedInUser.id
                  },
                  include: {
                    categorys: {
                      select: {
                        name: true
                      }
                    },
                    coffeShopPhotos: {
                      select: {
                        id: true
                      }
                    }
                  }
                });

              case 4:
                oldCoffeShop = _context.sent;

                if (oldCoffeShop) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "등록된 커피샵이 없습니다."
                });

              case 7:
                _context.next = 9;
                return _client["default"].coffeeShop.update({
                  where: {
                    id: id
                  },
                  data: {
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    categories: {
                      disconnect: oldCoffeShop.categorys,
                      connectOrCreate: (0, _coffes.processCategories)(categories)
                    }
                  }
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;