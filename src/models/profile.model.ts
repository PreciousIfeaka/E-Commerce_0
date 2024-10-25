import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import ExtendedBaseEntity from "../base-entity";
import { User } from "./user.model";

@Entity()
export class Profile extends ExtendedBaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  street_address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  gender: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
