"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../client"));

var _default = {
  Category: {
    totalShops: function totalShops(_ref) {
      var id = _ref.id;
      return _client["default"].coffeeShop.count({
        where: {
          categorys: {
            some: {
              id: id
            }
          }
        }
      });
    }
  }
};
exports["default"] = _default;