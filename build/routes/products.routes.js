"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const inputValidation_1 = require("../middleware/inputValidation");
const products_1 = require("../validationSchema/products");
const middleware_1 = require("../middleware");
const enums_1 = require("../enums");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.post(
  "/products",
  (0, inputValidation_1.validateData)(products_1.createProductSchema),
  middleware_1.authMiddleware,
  (0, middleware_1.checkRole)([enums_1.userRole.ADMIN]),
  controllers_1.createProduct,
);
productRouter.put(
  "/products/:id",
  (0, inputValidation_1.validateData)(products_1.updateProductSchema, [
    "body",
    "params",
  ]),
  middleware_1.authMiddleware,
  (0, middleware_1.checkRole)([enums_1.userRole.ADMIN]),
  controllers_1.updateProduct,
);
productRouter.delete(
  "/products/:id",
  (0, inputValidation_1.validateData)(products_1.deleteProductSchema, [
    "params",
  ]),
  middleware_1.authMiddleware,
  (0, middleware_1.checkRole)([enums_1.userRole.ADMIN]),
  controllers_1.deleteProduct,
);
productRouter.get(
  "/products/:id",
  (0, inputValidation_1.validateData)(products_1.getProductByIdSchema, [
    "params",
  ]),
  controllers_1.getProductById,
);
productRouter.get(
  "/products",
  (0, inputValidation_1.validateData)(products_1.getAllProductsSchema, [
    "params",
    "query",
  ]),
  controllers_1.getAllProducts,
);
//# sourceMappingURL=products.routes.js.map
