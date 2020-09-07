import {
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Chat } from "./Chat";

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
