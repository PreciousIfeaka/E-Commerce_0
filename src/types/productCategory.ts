import { string } from "zod";
import { Category } from "../models";

export interface ICreateCategory {
  name: string;
  description: string;
  image_url: string;
}

export interface IUpdateCategory {
  name: string;
  description: string;
  image_url: string;
}

export interface IProductCategoryService {
  createProductCategory(payload: ICreateCategory): Promise<{
    message: string;
    category: Partial<Category>;
  }>;

  updateProductCategory(
    payload: IUpdateCategory,
    categoryId: string,
  ): Promise<{
    message: string;
    category: Partial<Category>;
  }>;

  getCategoryById(categoryId: string): Promise<{
    message: string;
    category: Partial<Category>;
  }>;

  getAllCategories(
    query: {
      name?: string;
    },
    page: number,
    limit: number,
  ): Promise<{
    message: string;
    categories: Category[];
    total: number;
  }>;
}
