"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryService = void 0;
const models_1 = require("../models");
const data_source_1 = __importDefault(require("../data-source"));
const middleware_1 = require("../middleware");
class ProductCategoryService {
  constructor() {
    this.categoryRepository = data_source_1.default.getRepository(
      models_1.Category,
    );
  }
  async createProductCategory(payload) {
    try {
      const category = new models_1.Category();
      Object.assign(category, payload);
      const newCategory = await this.categoryRepository.save(category);
      if (!newCategory) {
        throw new middleware_1.ServerError(
          "Could not create category, try again",
        );
      }
      return {
        message: `${category.name} category created successfully`,
        category: newCategory,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async updateProductCategory(payload, categoryId) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new middleware_1.ResourceNotFound(
          `Category with id: ${categoryId} does not exist`,
        );
      }
      const savedCategory = await this.categoryRepository.save(payload);
      if (!savedCategory) {
        throw new middleware_1.ServerError(
          `An error occured while updating category - ${category.name}`,
        );
      }
      return {
        message: `Category - ${savedCategory.name} successfully updated.`,
        category: savedCategory,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async getCategoryById(categoryId) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new middleware_1.ResourceNotFound(
          `Category with id: ${categoryId} does not exist`,
        );
      }
      return {
        message: `Category ${category.name} retrieved successfully.`,
        category,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async getAllCategories(query, page, limit) {
    try {
      const querybuilder =
        this.categoryRepository.createQueryBuilder("category");
      if (query.name) {
        querybuilder.andWhere("category.name LIKE :name", {
          name: `%${query.name}%`,
        });
      }
      const currentPage = Number(page) || 1;
      const currentLimit = Number(limit) || 10;
      const [categories, total] = await querybuilder
        .skip((currentPage - 1) * currentLimit)
        .take(currentLimit)
        .getManyAndCount();
      return {
        message: "Successfully retrieved categories",
        categories: categories,
        total,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
}
exports.ProductCategoryService = ProductCategoryService;
//# sourceMappingURL=productCategory.service.js.map
