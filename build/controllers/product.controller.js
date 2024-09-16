"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct =
  exports.getAllProducts =
  exports.getProductById =
  exports.updateProduct =
  exports.createProduct =
    void 0;
const asyncHandler_1 = require("../helpers/asyncHandler");
const responseHelper_1 = require("../helpers/responseHelper");
const services_1 = require("../services");
const productService = new services_1.ProductService();
const createProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, product } = await productService.createProduct(
    req.body,
    req.query.subcategoryId,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 201, message, product);
});
exports.createProduct = createProduct;
const updateProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, product } = await productService.updateProduct(
    req.body,
    req.params.id,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, product);
});
exports.updateProduct = updateProduct;
const deleteProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, product } = await productService.deleteProduct(
    req.params.id,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, product);
});
exports.deleteProduct = deleteProduct;
const getProductById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, product } = await productService.getProductById(
    req.params.id,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, product);
});
exports.getProductById = getProductById;
const getAllProducts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { name, category, subcategory, minPrice, maxPrice, page, limit } =
    req.query;
  const searchCriteria = {
    name,
    category,
    subcategory,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
  };
  const { message, products, total } = await productService.getAllProducts(
    searchCriteria,
    Number(page),
    Number(limit),
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, {
    products,
    total,
  });
});
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=product.controller.js.map
