import { __prod__ } from "./constants";
import { Options } from "@mikro-orm/core";
import { BaseEntity, User, Chat } from "./entities";

const options: Options = {
  entities: [Chat, BaseEntity, User],
  dbName: "chat-app",
  type: "mongo",
  debug: !__prod__,
};
export default options;
