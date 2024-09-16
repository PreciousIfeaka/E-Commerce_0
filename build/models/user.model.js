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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("../base-entity"));
const enums_1 = require("../enums");
let User = class User extends base_entity_1.default {};
exports.User = User;
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "first_name",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "last_name",
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ unique: true }), __metadata("design:type", String)],
  User.prototype,
  "email",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "password",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "phone",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "avatar_url",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean),
  ],
  User.prototype,
  "is_verified",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "enum",
      enum: enums_1.userRole,
      default: enums_1.userRole.CUSTOMER,
    }),
    __metadata("design:type", String),
  ],
  User.prototype,
  "user_role",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number),
  ],
  User.prototype,
  "otp",
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp", nullable: false }),
    __metadata("design:type", Date),
  ],
  User.prototype,
  "otp_expiredAt",
  void 0,
);
exports.User = User = __decorate(
  [(0, typeorm_1.Entity)({ name: "users" })],
  User,
);
//# sourceMappingURL=user.model.js.map
