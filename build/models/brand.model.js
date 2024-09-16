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
exports.Brand = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("../base-entity"));
const products_model_1 = require("./products.model");
let Brand = class Brand extends base_entity_1.default {};
exports.Brand = Brand;
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Brand.prototype,
  "name",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Brand.prototype,
  "description",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Brand.prototype,
  "image_url",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => products_model_1.Product,
      (product) => product.brand,
    ),
    __metadata("design:type", Array),
  ],
  Brand.prototype,
  "products",
  void 0,
);
exports.Brand = Brand = __decorate([(0, typeorm_1.Entity)()], Brand);
//# sourceMappingURL=brand.model.js.map
