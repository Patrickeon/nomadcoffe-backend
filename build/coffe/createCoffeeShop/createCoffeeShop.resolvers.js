"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _coffes = require("../coffes.utils");

var _shard = require("../../shared/shard.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Mutation: {
    createCoffeeShop: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var name, latitude, longitude, photos, categories, loggedInUser, photosLast, categoriesObj, photoDataSeting;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = _ref.name, latitude = _ref.latitude, longitude = _ref.longitude, photos = _ref.photos, categories = _ref.categories;
                loggedInUser = _ref2.loggedInUser;
                photosLast = [];
                categoriesObj = []; // 이미지 중복선택시 처리

                photoDataSeting = function photoDataSeting() {
                  var endS3Count = 0;
                  return new Promise(function (resolve, rehect) {
                    var doneCount = photos.length;
                    photos.map( /*#__PURE__*/function () {
                      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(image) {
                        var url;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return (0, _shard.uploadToS3)(image, loggedInUser.id, "uploads");

                              case 2:
                                url = _context.sent;
                                photosLast({
                                  where: {
                                    url: url
                                  },
                                  create: {
                                    url: url
                                  }
                                });
                                endS3Count++;
                                if (doneCount === endS3Count) resolve("All Done");

                              case 6:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x4) {
                        return _ref4.apply(this, arguments);
                      };
                    }());
                  });
                };

                if (categories) {
                  categoriesObj = (0, _coffes.processCategories)(categories);
                }

                _context2.next = 8;
                return photoDataSeting();

              case 8:
                return _context2.abrupt("return", _client["default"].coffeeShop.create({
                  data: _objectSpread(_objectSpread(_objectSpread({}, photosLast.length > 0 && {
                    coffeShopPhotos: {
                      connectOrCreate: photosLast
                    }
                  }), categoriesObj.length > 0 && {
                    categorys: {
                      connectOrCreate: categoriesObj
                    }
                  }), {}, {
                    name: name,
                    latitude: latitude,
                    longitude: longitude
                  })
                }));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;