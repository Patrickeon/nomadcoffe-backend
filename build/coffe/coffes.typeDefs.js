"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type CoffeeShopPhoto {\n    id: Int\n    url: String\n    shop: CoffeeShop\n  }\n\n  type CoffeeShop {\n    id: Int\n    name: String\n    latitude: String\n    longitude: String\n    user: User\n    photos: [CoffeeShopPhoto]\n    categories: [Category]\n  }\n\n  type Category {\n    id: Int\n    name: String\n    slug: String\n    shops: [CoffeeShop]\n    totalShops: Int\n  }\n"])));

exports["default"] = _default;