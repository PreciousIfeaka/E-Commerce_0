import { asyncHandler } from "../helpers/asyncHandler";
import { sendJsonResponse } from "../helpers/responseHelper";
import { SubcategoryService } from "../services";
import { Request, Response } from "express";

const subcategoryService = new SubcategoryService();

const createProductSubcategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, subcategory } =
      await subcategoryService.createProductSubcategory(
        req.body,
        req.params.id,
      );
    sendJsonResponse(res, 201, message, subcategory);
  },
);

const updateProductSubcategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, subcategory } =
      await subcategoryService.updateProductSubcategory(
        req.body,
        req.params.id,
      );
    sendJsonResponse(res, 200, message, subcategory);
  },
);

const getSubcategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { message, subcategory } = await subcategoryService.getSubcategoryById(
    req.params.id,
  );
  sendJsonResponse(res, 200, message, subcategory);
});

const getAllSubcategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, category, page, limit } = req.query as any;
    const { message, subcategories, total } =
      await subcategoryService.getAllSubcategories(
        { name, category },
        page,
        limit,
      );
    sendJsonResponse(res, 200, message, { subcategories, total });
  },
);

export {
  createProductSubcategory,
  updateProductSubcategory,
  getSubcategoryById,
  getAllSubcategories,
};
