import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "name is not empty"),
  description: z.string().min(1, "description is not empty"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  coverimage_url: z.string().url("Invalid URL for cover image"),
  images_url: z.string().url("Invalid URL for images").optional(),
  stock_status: z.enum(["in-stock", "out-of-stock", "preorder"], {
    errorMap: () => ({ message: "Invalid stock status" }),
  }),
  product_size: z.enum(["large", "standard", "small"], {
    errorMap: () => ({ message: "Invalid product size" }),
  }),
  subcategoryId: z.string().uuid({ message: "Invalid subcategory ID format" }),
  brandId: z.string().uuid({ message: "Invalid brand ID format" }).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "name is not empty").optional(),
  description: z.string().min(1, "description is not empty").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer")
    .optional(),
  coverimage_url: z.string().url("Invalid URL for cover image").optional(),
  images_url: z.string().url("Invalid URL for images").optional(),
  stock_status: z
    .enum(["in-stock", "out-of-stock", "preorder"], {
      errorMap: () => ({ message: "Invalid stock status" }),
    })
    .optional(),
  product_size: z
    .enum(["large", "standard", "small"], {
      errorMap: () => ({ message: "Invalid product size" }),
    })
    .optional(),
  subcategoryId: z
    .string()
    .uuid({ message: "Invalid subcategory ID format" })
    .optional(),
  brandId: z.string().uuid({ message: "Invalid brand ID format" }).optional(),
  id: z.string().uuid({ message: "Invalid product ID format" }),
});

export const deleteProductSchema = z.object({
  id: z.string().uuid({ message: "Invalid product ID format" }),
});

export const getProductByIdSchema = z.object({
  id: z.string().uuid({ message: "Invalid product ID format" }),
});

export const getAllProductsSchema = z.object({
  name: z.string().min(1, "name can't be empty").optional(),
  category: z
    .string()
    .uuid({ message: "Invalid category ID format" })
    .optional(),
  subcategory: z
    .string()
    .uuid({ message: "Invalid subcategory ID format" })
    .optional(),
  brand: z.string().uuid({ message: "Invalid brand ID format" }).optional(),
  minPrice: z.number().positive("Price must be a positive number").optional(),
  maxPrice: z.number().positive("Price must be a positive number").optional(),
  page: z
    .number()
    .int()
    .nonnegative("page must be a non-negative integer")
    .optional(),
  limit: z
    .number()
    .int()
    .nonnegative("limit must be a non-negative integer")
    .optional(),
});
