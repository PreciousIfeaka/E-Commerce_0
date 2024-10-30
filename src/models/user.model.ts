import { Column, Entity, JoinColumn, JoinTable, OneToOne } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { userRole } from "../enums";
import { Profile } from "./profile.model";
import { Product } from "./products.model";
import { Cart } from "./cart.model";

@Entity({ name: "users" })
export class User extends ExtendedBaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: false })
  is_2fa_enabled: boolean;

  @Column({ nullable: true })
  secret_2fa: string;

  @Column({ nullable: true })
  auth_url_2fa: string;

  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.CUSTOMER,
  })
  user_role: userRole;

  @Column({ nullable: false })
  otp: number;

  @Column({ type: "timestamp" })
  otp_expiredAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn()
  cart: Cart;
}
