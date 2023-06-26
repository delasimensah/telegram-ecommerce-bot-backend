import { Router } from "express";

import { httpGetOrders } from "./orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/", httpGetOrders);
