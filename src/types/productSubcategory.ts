import { Subcategory } from "../models";

export interface ICreateSubcategory {
  name: string;
  description: string;
  image_url: string;
}

export interface IUpdateSubcategory {
  name: string;
  description: string;
  image_url: string;
}

export interface IProductSubcategoryService {
  createProductSubcategory(
    payload: ICreateSubcategory,
    categoryId: string,
  ): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }>;

  updateProductSubcategory(
    payload: IUpdateSubcategory,
    subcategoryId: string,
  ): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }>;

  getSubcategoryById(subcategoryId: string): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }>;

  getAllSubcategories(
    query: {
      name?: string;
      category?: string;
    },
    page: number,
    limit: number,
  ): Promise<{
    message: string;
    subcategories: Subcategory[];
    total: number;
  }>;
}
