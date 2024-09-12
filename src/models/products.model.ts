import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { Subcategory } from "./subcategories.model";
import { Brand } from "./brand.model";
import { productSize, stockStatus } from "../enums";
import { Category } from "./category.model";

@Entity()
export class Product extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  coverimage_url: string;

  @Column("simple-array", { nullable: true })
  images_url: string[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: "subcategoryId" })
  subcategory: Subcategory;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: "brandId" })
  brand: Brand;

  @Column({ type: "enum", enum: stockStatus })
  stock_status: stockStatus;

  @Column({ type: "enum", enum: productSize })
  product_size: productSize;
}
