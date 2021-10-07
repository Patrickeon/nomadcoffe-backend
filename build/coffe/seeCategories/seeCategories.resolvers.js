"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _coffes = require("../coffes.utils");

var _default = {
  Query: {
    seeCategories: (0, _users.protectedResolver)(function (_, _ref, _ref2) {
      var name = _ref.name,
          offset = _ref.offset;
      var loggedInUser = _ref2.loggedInUser;
      return _client["default"].category.findMany({
        take: 10,
        skip: offset,
        where: {
          name: name
        }
      });
    })
  }
};
exports["default"] = _default;