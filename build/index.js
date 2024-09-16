"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const data_source_1 = __importDefault(require("./data-source"));
const logger_1 = __importDefault(require("./utils/logger"));
const port = config_1.config.PORT;
data_source_1.default.initialize().then(async () => {
  app_1.default.listen(port, () => {
    logger_1.default.info(`Server is listening on port ${port}`);
  });
});
//# sourceMappingURL=index.js.map
