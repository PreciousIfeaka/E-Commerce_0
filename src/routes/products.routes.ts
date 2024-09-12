import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers";
import { validateData } from "../middleware/inputValidation";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "../validationSchema/products";
import { authMiddleware, checkRole } from "../middleware";
import { userRole } from "../enums";

const productRouter = Router();

productRouter.post(
  "/products",
  validateData(createProductSchema),
  authMiddleware,
  checkRole([userRole.ADMIN]),
  createProduct,
);

productRouter.put(
  "/products/:id",
  validateData(updateProductSchema, ["body", "params"]),
  authMiddleware,
  checkRole([userRole.ADMIN]),
  updateProduct,
);
productRouter.delete(
  "/products/:id",
  validateData(deleteProductSchema, ["params"]),
  authMiddleware,
  checkRole([userRole.ADMIN]),
  deleteProduct,
);
productRouter.get(
  "/products/:id",
  validateData(getProductByIdSchema, ["params"]),
  getProductById,
);
productRouter.get(
  "/products",
  validateData(getAllProductsSchema, ["params", "query"]),
  getAllProducts,
);

export { productRouter };
