"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCategories = void 0;

var processCategories = function processCategories(caption) {
  var categorys = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return categorys.map(function (category) {
    return {
      where: {
        category: category
      },
      create: {
        category: category
      }
    };
  });
};

exports.processCategories = processCategories;