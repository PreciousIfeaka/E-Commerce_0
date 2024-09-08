"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const APP_CONFIG = Object.freeze({
  USE_HTTPS: _1.default.NODE_ENV !== "development" ? true : false,
});
exports.default = APP_CONFIG;
//# sourceMappingURL=app.config.js.map
