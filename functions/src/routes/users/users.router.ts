import { Router } from "express";

import { httpGetUsers } from "./users.controller";

export const usersRouter = Router();

usersRouter.get("/", httpGetUsers);
