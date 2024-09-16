"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("../base-entity"));
const subcategories_model_1 = require("./subcategories.model");
const brand_model_1 = require("./brand.model");
const enums_1 = require("../enums");
const category_model_1 = require("./category.model");
let Product = class Product extends base_entity_1.default {};
exports.Product = Product;
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Product.prototype,
  "name",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Product.prototype,
  "description",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  Product.prototype,
  "price",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ default: 1 }), __metadata("design:type", Number)],
  Product.prototype,
  "quantity",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Product.prototype,
  "coverimage_url",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array),
  ],
  Product.prototype,
  "images_url",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => category_model_1.Category,
      (category) => category.products,
    ),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", category_model_1.Category),
  ],
  Product.prototype,
  "category",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => subcategories_model_1.Subcategory,
      (subcategory) => subcategory.products,
    ),
    (0, typeorm_1.JoinColumn)({ name: "subcategoryId" }),
    __metadata("design:type", subcategories_model_1.Subcategory),
  ],
  Product.prototype,
  "subcategory",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => brand_model_1.Brand,
      (brand) => brand.products,
    ),
    (0, typeorm_1.JoinColumn)({ name: "brandId" }),
    __metadata("design:type", brand_model_1.Brand),
  ],
  Product.prototype,
  "brand",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.stockStatus }),
    __metadata("design:type", String),
  ],
  Product.prototype,
  "stock_status",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.productSize }),
    __metadata("design:type", String),
  ],
  Product.prototype,
  "product_size",
  void 0,
);
exports.Product = Product = __decorate([(0, typeorm_1.Entity)()], Product);
//# sourceMappingURL=products.model.js.map
