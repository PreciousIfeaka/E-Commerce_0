import { asyncHandler } from "../helpers/asyncHandler";
import { sendJsonResponse } from "../helpers/responseHelper";
import { ProductCategoryService } from "../services/productCategory.service";
import { Request, Response } from "express";

const categoryService = new ProductCategoryService();

const createProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, category } = await categoryService.createProductCategory(
      req.body,
    );
    return sendJsonResponse(res, 201, message, category);
  },
);

const updateProductCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.query.id as string;
    const { message, category } = await categoryService.updateProductCategory(
      req.body,
      categoryId,
    );
    return sendJsonResponse(res, 200, message, category);
  },
);

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = req.query.id as string;
  const { message, category } =
    await categoryService.getCategoryById(categoryId);
  return sendJsonResponse(res, 200, message, category);
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const { name, page, limit } = req.query as any;
  const { message, categories, total } = await categoryService.getAllCategories(
    { name },
    page,
    limit,
  );
  return sendJsonResponse(res, 200, message, { categories, total });
});

export {
  createProductCategory,
  updateProductCategory,
  getCategoryById,
  getAllCategories,
};
