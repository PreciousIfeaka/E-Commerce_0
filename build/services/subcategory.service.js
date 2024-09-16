"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryService = void 0;
const models_1 = require("../models");
const data_source_1 = __importDefault(require("../data-source"));
const middleware_1 = require("../middleware");
class SubcategoryService {
  constructor() {
    this.subcategoryRepository = data_source_1.default.getRepository(
      models_1.Subcategory,
    );
    this.categoryRepository = data_source_1.default.getRepository(
      models_1.Category,
    );
  }
  async createProductSubcategory(payload, categoryId) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["subcategory"],
      });
      if (!category) {
        throw new middleware_1.ResourceNotFound(
          `category with id: ${categoryId} not found`,
        );
      }
      const subcategory = new models_1.Subcategory();
      Object.assign(subcategory, payload);
      const newSubcategory = await this.subcategoryRepository.save(subcategory);
      if (!newSubcategory) {
        throw new middleware_1.ServerError(
          `Could not create category ${payload.name}, try again`,
        );
      }
      return {
        message: `${newSubcategory.name} subcategory successfully created`,
        subcategory: newSubcategory,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
}
exports.SubcategoryService = SubcategoryService;
//# sourceMappingURL=subcategory.service.js.map
