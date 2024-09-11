import { Column, Entity, OneToMany } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { Product } from "./products.model";

@Entity()
export class Brand extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
