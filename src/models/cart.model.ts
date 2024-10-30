import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { User } from "./user.model";
import { Product } from "./products.model";

@Entity()
export class Cart extends ExtendedBaseEntity {
  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  cartItems: CartItem[];
}

@Entity()
export class CartItem extends ExtendedBaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: "int" })
  quantity: number;
}
