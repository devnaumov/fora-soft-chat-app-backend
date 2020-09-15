import {
  Entity,
  Property,
  ManyToOne,
  Collection,
  ManyToMany,
  OneToMany,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class Chat extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany({ entity: () => User })
  users = new Collection<User>(this);

  @ManyToOne()
  admin: User;

  @ManyToMany({ entity: () => Message, owner: true })
  messages = new Collection<Message>(this);

  constructor(name: string, admin: User) {
    super();
    this.name = name;
    this.admin = admin;
  }
}
