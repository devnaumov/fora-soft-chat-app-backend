import { Request, Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";
import { User } from "../entities";
import { DI } from "..";
import { request } from "http";
import { Message } from "../entities/Message";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);

  if (!req.body.text || !req.body.ownerId || !req.body.chatId) {
    res.status(400);
    return res.json({
      message: "One of `text`, `ownerId`, `chatId` is missing",
    });
  }

  try {
    const chat = await DI.chatRepository.findOne({ id: req.body.chatId }, [
      "messages",
    ]);

    const message = new Message(
      req.body.text,
      req.body.ownerId,
      req.body.chatId
    );

    if (chat) {
      chat.messages.add(message);
    }

    wrap(message).assign(req.body);

    DI.messageRepository.persistLater(message);

    await DI.messageRepository.flush();

    res.json(message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    wrap(user).assign(req.body);
    await DI.userRepository.persistAndFlush(user);

    res.json(user);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export const MessageController = router;
