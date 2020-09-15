import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
export class Message extends BaseEntity {
  @Property()
  text: string;

  @ManyToOne(() => Chat)
  chat: Chat;

  @ManyToOne()
  owner: User;

  constructor(text: string, chat: Chat, owner: User) {
    super();
    this.text = text;
    this.chat = chat;
    this.owner = owner;
  }
}
