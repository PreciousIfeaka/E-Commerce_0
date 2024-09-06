import ExtendedBaseEntity from "src/base-entity";
import { Column, Entity } from "typeorm";


enum userRole {
  ADMIN = "admin",
  VENDOR = "vendor",
  CUSTOMER = "customer"
};


@Entity({name: "users"})
class User extends ExtendedBaseEntity {
  @Column({"nullable": false})
  first_name: string;

  @Column({"nullable": false})
  last_name: string;

  @Column({"unique": true})
  email: string;

  @Column({"nullable": true})
  password: string;

  @Column({"nullable": true})
  avatar_url: string;

  @Column({"default": false})
  is_verified: boolean;

  @Column({
    type: "varchar",
    array: true,
    default: userRole.CUSTOMER
  })
  user_role: userRole[]
}

export default User;
