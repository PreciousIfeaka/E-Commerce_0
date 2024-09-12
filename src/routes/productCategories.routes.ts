import { Router } from "express";
import {
  createProductCategory,
  getAllCategories,
  getCategoryById,
  updateProductCategory,
} from "../controllers";

const categoryRouter = Router();

categoryRouter.get("/products/categories", getAllCategories);
categoryRouter.get("/products/category/:id", getCategoryById);
categoryRouter.post("/products/category", createProductCategory);
categoryRouter.put("/products/category/:id", updateProductCategory);

export { categoryRouter };
