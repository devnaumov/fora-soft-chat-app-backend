import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  ManyToMany,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Chat extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany({ entity: () => User })
  users = new Collection<User>(this);

  @ManyToOne()
  admin: User;

  constructor(name: string, admin: User) {
    super();
    this.name = name;
    this.admin = admin;
  }
}
