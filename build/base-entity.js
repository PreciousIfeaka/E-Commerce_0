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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let ExtendedBaseEntity = class ExtendedBaseEntity extends typeorm_1.BaseEntity {
  async validateOnInsert() {
    await (0, class_validator_1.validateOrReject)(this);
  }
  async validateOnUpdate() {
    await (0, class_validator_1.validateOrReject)(this, {
      skipMissingProperties: true,
    });
  }
};
__decorate(
  [
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  ExtendedBaseEntity.prototype,
  "validateOnInsert",
  null,
);
__decorate(
  [
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  ExtendedBaseEntity.prototype,
  "validateOnUpdate",
  null,
);
__decorate(
  [
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String),
  ],
  ExtendedBaseEntity.prototype,
  "id",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  ExtendedBaseEntity.prototype,
  "created_at",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  ExtendedBaseEntity.prototype,
  "updated_at",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date),
  ],
  ExtendedBaseEntity.prototype,
  "deleted_at",
  void 0,
);
ExtendedBaseEntity = __decorate([(0, typeorm_1.Entity)()], ExtendedBaseEntity);
exports.default = ExtendedBaseEntity;
//# sourceMappingURL=base-entity.js.map
