"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const APP_CONFIG = Object.freeze({
  USE_HTTPS: _1.config.NODE_ENV !== "development" ? true : false,
});
exports.default = APP_CONFIG;
//# sourceMappingURL=app.config.js.map
