import { Router } from "express";

import {
  httpGetOrders,
  httpGetOrder,
  httpUpdateOrder,
} from "./orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/", httpGetOrders);
ordersRouter.get("/:id", httpGetOrder);
ordersRouter.patch("/:id", httpUpdateOrder);
