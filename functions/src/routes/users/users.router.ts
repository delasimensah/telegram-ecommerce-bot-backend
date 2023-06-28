import { Router } from "express";

import { httpGetUsers, httpUpdateUser } from "./users.controller";

export const usersRouter = Router();

usersRouter.get("/", httpGetUsers);
usersRouter.patch("/:id", httpUpdateUser);
