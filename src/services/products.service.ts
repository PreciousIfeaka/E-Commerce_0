import { Repository } from "typeorm";
import { Brand, Product, Subcategory } from "../models";
import AppDataSource from "../data-source";
import { ICreateProduct, IProductService, IUpdateProduct } from "../types";
import { ResourceNotFound, ServerError } from "../middleware";

export class ProductService implements IProductService {
  private productRepository: Repository<Product>;
  private subcategoryRepository: Repository<Subcategory>;
  private brandRepository: Repository<Brand>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.subcategoryRepository = AppDataSource.getRepository(Subcategory);
    this.brandRepository = AppDataSource.getRepository(Brand);
  }

  public async createProduct(
    payload: ICreateProduct,
    subcategoryId: string,
    brandId?: string,
  ): Promise<{
    message: string;
    product: Partial<Product>;
  }> {
    const newProduct = new Product();
    Object.assign(newProduct, payload);

    const subCategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
      relations: ["category"],
    });

    if (!subCategory) {
      throw new ResourceNotFound("subcategory not found");
    }

    newProduct.subcategory = subCategory;
    newProduct.category = subCategory.category;

    if (brandId) {
      const brand = await this.brandRepository.findOneBy({ id: brandId });

      if (!brand) {
        throw new ResourceNotFound("Brand with given ID not found");
      }
      newProduct.brand = brand;
    }

    const product = await this.productRepository.save(newProduct);

    if (!Product) {
      throw new ServerError("Could not create product, try again.");
    }

    return {
      message: "Product created successfully",
      product,
    };
  }

  public async updateProduct(
    payload: IUpdateProduct,
    productId: string,
  ): Promise<{
    message: string;
    product: Partial<Product>;
  }> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new ResourceNotFound("Could not retrieve product");
    }

    const updatedProduct = await this.productRepository.save({
      id: productId,
      payload,
    });

    if (!updatedProduct) {
      throw new ServerError("Could not update product");
    }

    return {
      message: "Successfully updated product",
      product: updatedProduct,
    };
  }

  public async deleteProduct(productId: string): Promise<{
    message: string;
    product: Partial<Product>;
  }> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new ResourceNotFound("Could not retrieve product details");
    }

    await this.productRepository.remove(product);

    const deletedProduct = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!deletedProduct?.deleted_at) {
      throw new ServerError("Could not delete product");
    }

    return {
      message: "successfully deleted product",
      product: product,
    };
  }

  public async getProductById(productId: string): Promise<{
    message: string;
    product: Partial<Product>;
  }> {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!product) {
      throw new ResourceNotFound("Could not retrieve products");
    }

    return {
      message: "Retrieved product successful",
      product,
    };
  }

  public async getAllProducts(
    query: {
      name?: string;
      category?: string;
      subcategory?: string;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
    },
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    message: string;
    products: Product[];
    total: number;
  }> {
    const querybuilder = this.productRepository.createQueryBuilder("product");

    if (query.name) {
      querybuilder.andWhere("product.name LIKE :name", {
        name: `%${query.name}%`,
      });
    }

    if (query.category) {
      querybuilder.andWhere("product.categoryId = :categoryId", {
        categoryId: query.category,
      });
    }

    if (query.subcategory) {
      querybuilder.andWhere("product.subcategoryId = :subcategoryId", {
        subcategoryId: query.subcategory,
      });
    }

    if (query.brand) {
      querybuilder.andWhere("product.brandId = :brandId", {
        brandId: query.brand,
      });
    }

    if (query.minPrice) {
      querybuilder.andWhere("product.price >= :minPrice", {
        minPrice: query.minPrice,
      });
    }

    if (query.maxPrice) {
      querybuilder.andWhere("product.price <= :maxPrice", {
        maxPrice: query.maxPrice,
      });
    }

    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;

    const [products, total] = await querybuilder
      .skip((currentPage - 1) * currentLimit)
      .take(currentLimit)
      .getManyAndCount();

    return {
      message: "successfully retrieved products",
      products,
      total,
    };
  }
}
