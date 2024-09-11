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
import { authMiddleware } from "../middleware";

const productRouter = Router();

productRouter.post(
  "/products",
  validateData(createProductSchema),
  authMiddleware,
  createProduct,
);
productRouter.put(
  "/products/:id",
  validateData(updateProductSchema, ["body", "params"]),
  authMiddleware,
  updateProduct,
);
productRouter.delete(
  "/products/:id",
  validateData(deleteProductSchema, ["params"]),
  authMiddleware,
  deleteProduct,
);
productRouter.get(
  "/products/:id",
  validateData(getProductByIdSchema, ["params"]),
  authMiddleware,
  getProductById,
);
productRouter.get(
  "/products",
  validateData(getAllProductsSchema, ["params", "query"]),
  authMiddleware,
  getAllProducts,
);

export { productRouter };
