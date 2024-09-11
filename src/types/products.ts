import { Brand, Product } from "../models";

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  coverimage_url: string;
  images_url?: string;
  stock_status: string;
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
    payload: Partial<Product>,
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
