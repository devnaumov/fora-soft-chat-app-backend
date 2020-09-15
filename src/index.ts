import "reflect-metadata";
import {
  MikroORM,
  EntityManager,
  EntityRepository,
  RequestContext,
} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Chat } from "./entities/Chat";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ChatController } from "./controllers";
import { User } from "./entities";
import { UserController } from "./controllers/user.controller";
import session from "express-session";
import connectMongo from "connect-mongo";
import socket from "socket.io";
import http from "http";
import { Message } from "./entities/Message";
import { MessageController } from "./controllers/message.controller";
import cors from "cors";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  chatRepository: EntityRepository<Chat>;
  userRepository: EntityRepository<User>;
  messageRepository: EntityRepository<Message>;
};

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socket(server);

(async () => {
  try {
    DI.orm = await MikroORM.init(microConfig);
    DI.em = DI.orm.em;
    DI.chatRepository = DI.orm.em.getRepository(Chat);
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.messageRepository = DI.orm.em.getRepository(Message);

    const MongoStore = connectMongo(session);

    app.use(cors());
    app.use(express.json());

    app.use((req, res, next) => {
      req.io = io;
      next();
    });
    app.use(
      session({
        store: new MongoStore({
          url: `${DI.em.getDriver().getConnection().getClientUrl()}/chat-app`,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
          httpOnly: true,
          sameSite: "lax", //csrf
          secure: __prod__, //cookie only worksin https
        },
        secret: "KHAIBVYICGAHUVRI",
        resave: false,
        name: "qid",
        saveUninitialized: false,
      })
    );

    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    app.get("/", (req, res) =>
      res.json({
        message: "Welcome to fora soft test chat app",
      })
    );
    app.use("/chat", ChatController);
    app.use("/user", UserController);
    app.use("/message", MessageController);

    io.on("connection", (socket) => {
      console.log("user connectet");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
        console.log("message: " + msg);
      });
    });

    app.use((req, res) => res.status(404).json({ message: "No route found" }));

    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
