"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSize = exports.stockStatus = void 0;
var stockStatus;
(function (stockStatus) {
  stockStatus["IN_STOCK"] = "in-stock";
  stockStatus["OUT_OF_STOCK"] = "out-of-stock";
  stockStatus["LOW_STOCK"] = "low-stock";
  stockStatus["PREORDER"] = "preorder";
})(stockStatus || (exports.stockStatus = stockStatus = {}));
var productSize;
(function (productSize) {
  productSize["LARGE"] = "large";
  productSize["STANDARD"] = "standard";
  productSize["SMALL"] = "small";
})(productSize || (exports.productSize = productSize = {}));
//# sourceMappingURL=product.js.map
