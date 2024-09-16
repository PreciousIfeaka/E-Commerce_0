"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
function validateData(schema, targets = ["body"]) {
  return (req, res, next) => {
    try {
      targets.forEach((target) => {
        if (target in req) {
          const validatedData = schema.parse(req[target]);
          req[target] = validatedData;
        }
      });
      next();
    } catch (error) {
      if (error instanceof zod_1.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(422).json({ errors: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
//# sourceMappingURL=inputValidation.js.map
