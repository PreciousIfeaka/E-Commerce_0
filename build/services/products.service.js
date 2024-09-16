"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const models_1 = require("../models");
const data_source_1 = __importDefault(require("../data-source"));
const middleware_1 = require("../middleware");
class ProductService {
  constructor() {
    this.productRepository = data_source_1.default.getRepository(
      models_1.Product,
    );
    this.subcategoryRepository = data_source_1.default.getRepository(
      models_1.Subcategory,
    );
    this.brandRepository = data_source_1.default.getRepository(models_1.Brand);
  }
  async createProduct(payload, subcategoryId, brandId) {
    const newProduct = new models_1.Product();
    Object.assign(newProduct, payload);
    const subCategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
      relations: ["category"],
    });
    if (!subCategory) {
      throw new middleware_1.ResourceNotFound("subcategory not found");
    }
    newProduct.subcategory = subCategory;
    newProduct.category = subCategory.category;
    if (brandId) {
      const brand = await this.brandRepository.findOneBy({ id: brandId });
      if (!brand) {
        throw new middleware_1.ResourceNotFound(
          "Brand with given ID not found",
        );
      }
      newProduct.brand = brand;
    }
    const product = await this.productRepository.save(newProduct);
    if (!models_1.Product) {
      throw new middleware_1.ServerError(
        "Could not create product, try again.",
      );
    }
    return {
      message: "Product created successfully",
      product,
    };
  }
  async updateProduct(payload, productId) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new middleware_1.ResourceNotFound("Could not retrieve product");
    }
    const updatedProduct = await this.productRepository.save({
      id: productId,
      payload,
    });
    if (!updatedProduct) {
      throw new middleware_1.ServerError("Could not update product");
    }
    return {
      message: "Successfully updated product",
      product: updatedProduct,
    };
  }
  async deleteProduct(productId) {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new middleware_1.ResourceNotFound(
        "Could not retrieve product details",
      );
    }
    await this.productRepository.remove(product);
    const deletedProduct = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!deletedProduct?.deleted_at) {
      throw new middleware_1.ServerError("Could not delete product");
    }
    return {
      message: "successfully deleted product",
      product: product,
    };
  }
  async getProductById(productId) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!product) {
      throw new middleware_1.ResourceNotFound("Could not retrieve products");
    }
    return {
      message: "Retrieved product successful",
      product,
    };
  }
  async getAllProducts(query, page = 1, limit = 10) {
    const querybuilder = this.productRepository.createQueryBuilder("product");
    if (query.name) {
      querybuilder.andWhere("product.name LIKE :name", {
        name: `%${query.name}%`,
      });
    }
    if (query.category) {
      querybuilder.andWhere("product.categoryId = :categoryId", {
        categoryId: query.category,
      });
    }
    if (query.subcategory) {
      querybuilder.andWhere("product.subcategoryId = :subcategoryId", {
        subcategoryId: query.subcategory,
      });
    }
    if (query.brand) {
      querybuilder.andWhere("product.brandId = :brandId", {
        brandId: query.brand,
      });
    }
    if (query.minPrice) {
      querybuilder.andWhere("product.price >= :minPrice", {
        minPrice: query.minPrice,
      });
    }
    if (query.maxPrice) {
      querybuilder.andWhere("product.price <= :maxPrice", {
        maxPrice: query.maxPrice,
      });
    }
    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;
    const [products, total] = await querybuilder
      .skip((currentPage - 1) * currentLimit)
      .take(currentLimit)
      .getManyAndCount();
    return {
      message: "successfully retrieved products",
      products,
      total,
    };
  }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map
