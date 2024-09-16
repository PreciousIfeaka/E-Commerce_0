import { Router } from "express";
import {
  createProductSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateProductSubcategory,
} from "../controllers";

const subcategoryRouter = Router();

subcategoryRouter.get(
  "/products/categories/subcategories",
  getAllSubcategories,
);
subcategoryRouter.post(
  "/products/categories/:id/subcategories",
  createProductSubcategory,
);
subcategoryRouter.put(
  "/products/categories/subcategories/:id",
  updateProductSubcategory,
);
subcategoryRouter.get(
  "/products/categories/subcategories/:id",
  getSubcategoryById,
);

export { subcategoryRouter };
