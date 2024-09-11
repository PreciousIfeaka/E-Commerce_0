import { Brand, Product } from "../models";

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  coverimage_url: string;
  images_url?: string;
  stock_status: string;
  product_size: string;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  coverimage_url?: string;
  images_url?: string;
  stock_status?: string;
  brandId?: string;
  subcategoryId?: string;
}

export interface IProductService {
  createProduct(
    payload: ICreateProduct,
    subcategoryId: string,
  ): Promise<{
    message: string;
    product: Partial<Product>;
  }>;

  updateProduct(
    payload: IUpdateProduct,
    productId: string,
  ): Promise<{
    message: string;
    product: Partial<Product>;
  }>;

  deleteProduct(productId: string): Promise<{
    message: string;
    product: Partial<Product>;
  }>;

  getProductById(productId: string): Promise<{
    message: string;
    product: Partial<Product>;
  }>;

  getAllProducts(
    query: {
      name?: string;
      category?: string;
      subcategory?: string;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
    },
    page: number,
    limit: number,
  ): Promise<{
    message: string;
    products: Product[];
    total: number;
  }>;
}
