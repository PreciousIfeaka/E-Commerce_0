"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.options("*", (0, cors_1.default)());
app.use(
  (0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  res.send({
    message:
      "I am the responder for e-commerce api. Visit /api/docs to access the openapi documentation.",
  });
});
app.get("/api/v1", (_req, res) => {
  res.send({
    message: "I am the responder for e-commerce api",
  });
});
app.use("/api/v1", routes_1.authRouter);
app.use("/api/v1", routes_1.categoryRouter);
app.use("/api/v1", routes_1.productRouter);
exports.default = app;
//# sourceMappingURL=app.js.map
