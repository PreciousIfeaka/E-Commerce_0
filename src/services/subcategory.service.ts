import { Repository } from "typeorm";
import { Category, Subcategory } from "../models";
import AppDataSource from "../data-source";
import {
  ICreateSubcategory,
  IProductSubcategoryService,
  IUpdateSubcategory,
} from "../types/productSubcategory";
import { HttpError, ResourceNotFound, ServerError } from "../middleware";

export class SubcategoryService implements IProductSubcategoryService {
  private subcategoryRepository: Repository<Subcategory>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.subcategoryRepository = AppDataSource.getRepository(Subcategory);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  public async createProductSubcategory(
    payload: ICreateSubcategory,
    categoryId: string,
  ): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["subcategories"],
      });

      if (!category) {
        throw new ResourceNotFound(`category with id: ${categoryId} not found`);
      }

      const subcategory = new Subcategory();
      Object.assign(subcategory, payload);

      category.subcategories = category.subcategories || [];
      category.subcategories.push(subcategory);

      await this.categoryRepository.save(category);
      const newSubcategory = await this.subcategoryRepository.save(subcategory);

      if (!newSubcategory) {
        throw new ServerError(
          `Could not create category ${payload.name}, try again`,
        );
      }

      return {
        message: `${newSubcategory.name} subcategory successfully created`,
        subcategory: newSubcategory,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async updateProductSubcategory(
    payload: IUpdateSubcategory,
    subcategoryId: string,
  ): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }> {
    try {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: subcategoryId },
      });

      if (!subcategory) {
        throw new ResourceNotFound(`subcategory with id:`);
      }

      const newSubcategory = await this.subcategoryRepository.save(payload);

      if (!newSubcategory) {
        throw new ServerError(
          `Could not update ${subcategory.name} subcategory, try again.`,
        );
      }

      return {
        message: `Successfully updated ${subcategory.name} subcategory`,
        subcategory: newSubcategory,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async getSubcategoryById(subcategoryId: string): Promise<{
    message: string;
    subcategory: Partial<Subcategory>;
  }> {
    try {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: subcategoryId },
      });

      if (!subcategory) {
        throw new ResourceNotFound(
          `Subcategory with id: ${subcategoryId} not found`,
        );
      }

      return {
        message: `Successfully retrieved ${subcategory.name} subcategory`,
        subcategory,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async getAllSubcategories(
    query: { name?: string; category?: string },
    page: number,
    limit: number,
  ): Promise<{
    message: string;
    subcategories: Subcategory[];
    total: number;
  }> {
    try {
      const querybuilder =
        this.subcategoryRepository.createQueryBuilder("subcategory");

      if (query.name) {
        querybuilder.andWhere("subcategory.name LIKE :name", {
          name: `%${query.name}%`,
        });
      }

      if (query.category) {
        querybuilder.andWhere("subcategory.category = :category", {
          category: `%${query.category}%`,
        });
      }

      const currentPage = Number(page) || 1;
      const currentLimit = Number(limit) || 10;

      const [result, total] = await querybuilder
        .skip((currentPage - 1) * currentLimit)
        .take(currentLimit)
        .getManyAndCount();

      return {
        message: "successfully retrieved subcategories",
        subcategories: result,
        total,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError((error as Error).message);
    }
  }
}
