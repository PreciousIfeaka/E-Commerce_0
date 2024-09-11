import { Column, Entity, OneToMany } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { Subcategory } from "./subcategories.model";
import { Product } from "./products.model";

@Entity()
export class Category extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
