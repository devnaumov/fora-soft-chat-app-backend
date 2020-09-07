import { Request, Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";
import { User } from "../entities";
import { DI } from "..";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await DI.userRepository.findAll();
  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);

  if (!req.body.name) {
    res.status(400);
    return res.json({ message: "One of `name` is missing" });
  }

  try {
    const user = new User(req.body.name);
    wrap(user).assign(req.body);
    await DI.chatRepository.persistAndFlush(user);

    req.session!.userId = user.id;
    res.json(user);
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

export const UserController = router;
