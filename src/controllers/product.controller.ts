import { asyncHandler } from "../helpers/asyncHandler";
import { sendJsonResponse } from "../helpers/responseHelper";
import { ProductService } from "../services";
import { Request, Response, NextFunction } from "express";

const productService = new ProductService();

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { message, product } = await productService.createProduct(
    req.body,
    req.query.subcategoryId as string,
  );
  sendJsonResponse(res, 201, message, product);
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { message, product } = await productService.updateProduct(
    req.body,
    req.params.id as string,
  );
  sendJsonResponse(res, 200, message, product);
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { message, product } = await productService.deleteProduct(
    req.params.id as string,
  );
  sendJsonResponse(res, 200, message, product);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { message, product } = await productService.getProductById(
    req.params.id as string,
  );
  sendJsonResponse(res, 200, message, product);
});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, subcategory, minPrice, maxPrice, page, limit } =
    req.query as any;

  const searchCriteria = {
    name,
    category,
    subcategory,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
  };
  const { message, products, total } = await productService.getAllProducts(
    searchCriteria,
    Number(page),
    Number(limit),
  );
  sendJsonResponse(res, 200, message, { products, total });
});

export {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
};
