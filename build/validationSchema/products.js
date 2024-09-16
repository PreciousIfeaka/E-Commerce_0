"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsSchema =
  exports.getProductByIdSchema =
  exports.deleteProductSchema =
  exports.updateProductSchema =
  exports.createProductSchema =
    void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
  name: zod_1.z.string().min(1, "name is not empty"),
  description: zod_1.z.string().min(1, "description is not empty"),
  price: zod_1.z.number().positive("Price must be a positive number"),
  quantity: zod_1.z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  coverimage_url: zod_1.z.string().url("Invalid URL for cover image"),
  images_url: zod_1.z.string().url("Invalid URL for images").optional(),
  stock_status: zod_1.z.enum(["in-stock", "out-of-stock", "preorder"], {
    errorMap: () => ({ message: "Invalid stock status" }),
  }),
  product_size: zod_1.z.enum(["large", "standard", "small"], {
    errorMap: () => ({ message: "Invalid product size" }),
  }),
  brandId: zod_1.z
    .string()
    .uuid({ message: "Invalid brand ID format" })
    .optional(),
});
exports.updateProductSchema = zod_1.z.object({
  name: zod_1.z.string().min(1, "name is not empty").optional(),
  description: zod_1.z.string().min(1, "description is not empty").optional(),
  price: zod_1.z
    .number()
    .positive("Price must be a positive number")
    .optional(),
  quantity: zod_1.z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer")
    .optional(),
  coverimage_url: zod_1.z
    .string()
    .url("Invalid URL for cover image")
    .optional(),
  images_url: zod_1.z.string().url("Invalid URL for images").optional(),
  stock_status: zod_1.z
    .enum(["in-stock", "out-of-stock", "preorder"], {
      errorMap: () => ({ message: "Invalid stock status" }),
    })
    .optional(),
  product_size: zod_1.z
    .enum(["large", "standard", "small"], {
      errorMap: () => ({ message: "Invalid product size" }),
    })
    .optional(),
  subcategoryId: zod_1.z
    .string()
    .uuid({ message: "Invalid subcategory ID format" })
    .optional(),
  brandId: zod_1.z
    .string()
    .uuid({ message: "Invalid brand ID format" })
    .optional(),
  id: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
});
exports.deleteProductSchema = zod_1.z.object({
  id: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
});
exports.getProductByIdSchema = zod_1.z.object({
  id: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
});
exports.getAllProductsSchema = zod_1.z.object({
  name: zod_1.z.string().min(1, "name can't be empty").optional(),
  category: zod_1.z
    .string()
    .uuid({ message: "Invalid category ID format" })
    .optional(),
  subcategory: zod_1.z
    .string()
    .uuid({ message: "Invalid subcategory ID format" })
    .optional(),
  brand: zod_1.z
    .string()
    .uuid({ message: "Invalid brand ID format" })
    .optional(),
  minPrice: zod_1.z
    .number()
    .positive("Price must be a positive number")
    .optional(),
  maxPrice: zod_1.z
    .number()
    .positive("Price must be a positive number")
    .optional(),
  page: zod_1.z
    .number()
    .int()
    .nonnegative("page must be a non-negative integer")
    .optional(),
  limit: zod_1.z
    .number()
    .int()
    .nonnegative("limit must be a non-negative integer")
    .optional(),
});
//# sourceMappingURL=products.js.map
