"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories =
  exports.getCategoryById =
  exports.updateProductCategory =
  exports.createProductCategory =
    void 0;
const asyncHandler_1 = require("../helpers/asyncHandler");
const responseHelper_1 = require("../helpers/responseHelper");
const productCategory_service_1 = require("../services/productCategory.service");
const categoryService = new productCategory_service_1.ProductCategoryService();
const createProductCategory = (0, asyncHandler_1.asyncHandler)(
  async (req, res) => {
    const { message, category } = await categoryService.createProductCategory(
      req.body,
    );
    return (0, responseHelper_1.sendJsonResponse)(res, 201, message, category);
  },
);
exports.createProductCategory = createProductCategory;
const updateProductCategory = (0, asyncHandler_1.asyncHandler)(
  async (req, res) => {
    const categoryId = req.query.id;
    const { message, category } = await categoryService.updateProductCategory(
      req.body,
      categoryId,
    );
    return (0, responseHelper_1.sendJsonResponse)(res, 200, message, category);
  },
);
exports.updateProductCategory = updateProductCategory;
const getCategoryById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const categoryId = req.query.id;
  const { message, category } =
    await categoryService.getCategoryById(categoryId);
  return (0, responseHelper_1.sendJsonResponse)(res, 200, message, category);
});
exports.getCategoryById = getCategoryById;
const getAllCategories = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { name, page, limit } = req.query;
  const { message, categories, total } = await categoryService.getAllCategories(
    { name },
    page,
    limit,
  );
  return (0, responseHelper_1.sendJsonResponse)(res, 200, message, {
    categories,
    total,
  });
});
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=productCategory.controller.js.map
