import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { Category } from "./category.model";
import { Product } from "./products.model";

@Entity()
export class Subcategory extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}
