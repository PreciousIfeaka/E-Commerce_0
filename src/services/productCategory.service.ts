import { Repository } from "typeorm";
import { Category } from "../models";
import AppDataSource from "../data-source";
import {
  ICreateCategory,
  IProductCategoryService,
  IUpdateCategory,
} from "../types";
import { HttpError, ResourceNotFound, ServerError } from "../middleware";

export class ProductCategoryService implements IProductCategoryService {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  public async createProductCategory(payload: ICreateCategory): Promise<{
    message: string;
    category: Partial<Category>;
  }> {
    try {
      const category = new Category();
      Object.assign(category, payload);

      const newCategory = await this.categoryRepository.save(category);
      if (!newCategory) {
        throw new ServerError("Could not create category, try again");
      }

      return {
        message: `${category.name} category created successfully`,
        category: newCategory,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async updateProductCategory(
    payload: IUpdateCategory,
    categoryId: string,
  ): Promise<{
    message: string;
    category: Partial<Category>;
  }> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new ResourceNotFound(`Category - ${categoryId} does not exist`);
      }

      const savedCategory = await this.categoryRepository.save(payload);

      if (!savedCategory) {
        throw new ServerError(
          `An error occured while updating category - ${category.name}`,
        );
      }

      return {
        message: `Category - ${savedCategory.name} successfully updated.`,
        category: savedCategory,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }
}
