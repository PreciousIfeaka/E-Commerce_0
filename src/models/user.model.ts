import { Column, Entity } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { userRole } from "../enums";

@Entity({ name: "users" })
export class User extends ExtendedBaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar_url: string;

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

  @Column({ type: "timestamp", nullable: false })
  otp_expiredAt: Date;
}
