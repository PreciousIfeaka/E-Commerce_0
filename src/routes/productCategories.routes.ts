import { Router } from "express";
import {
  createProductCategory,
  getAllCategories,
  getCategoryById,
  updateProductCategory,
} from "../controllers";

const categoryRouter = Router();

categoryRouter.get("/products/categories", getAllCategories);
categoryRouter.get("/products/categories/:id", getCategoryById);
categoryRouter.post("/products/categories", createProductCategory);
categoryRouter.put("/products/categories/:id", updateProductCategory);

export { categoryRouter };
