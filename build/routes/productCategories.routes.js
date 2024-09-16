"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.get("/products/categories", controllers_1.getAllCategories);
categoryRouter.get("/products/category/:id", controllers_1.getCategoryById);
categoryRouter.post("/products/category", controllers_1.createProductCategory);
categoryRouter.put(
  "/products/category/:id",
  controllers_1.updateProductCategory,
);
//# sourceMappingURL=productCategories.routes.js.map
