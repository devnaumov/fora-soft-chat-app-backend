import { Request, Response } from "express";
import Router from "express-promise-router";
import { QueryOrder, wrap } from "@mikro-orm/core";
import { Chat } from "../entities";
import { DI } from "..";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const chats = await DI.chatRepository.findAll(["users"]);
  res.json(chats);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const chat = await DI.chatRepository.findOne(req.params.id, ["users"]);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.adminId) {
    res.status(400);
    return res.json({ message: "One of `name, admin` is missing" });
  }

  try {
    const chat = new Chat(req.body.name, req.body.adminId);
    wrap(chat).assign(req.body);

    DI.chatRepository.persistLater(chat);
    chat.users.add(chat.admin);
    DI.chatRepository.flush();

    res.json(chat);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const chat = await DI.chatRepository.findOne(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: "chat not found" });
    }

    wrap(chat).assign(req.body);
    await DI.chatRepository.persistAndFlush(chat);

    res.json(chat);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post("/invite-user", async (req: Request, res: Response) => {
  if (!req.body.chatId || !req.body.userId) {
    res.status(400);
    return res.json({ message: "One of `chatId, userId` is missing" });
  }

  try {
    const chat = await DI.chatRepository.findOne(req.body.chatId);
    const user = await DI.userRepository.findOne(req.body.userId);

    if (!chat || !user) {
      return res.status(404).json({ message: "Chat or user not found" });
    }
    chat.users.add(user);
    res.json(chat);
    await DI.chatRepository.persistAndFlush(chat);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export const ChatController = router;
