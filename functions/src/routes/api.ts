import { Router } from "express";

import { categoriesRouter } from "./categories/categories.router";
import { productsRouter } from "./products/products.router";
import { ordersRouter } from "./orders/orders.router";
import { usersRouter } from "./users/users.router";

export const api = Router();

api.use("/api/categories", categoriesRouter);
api.use("/api/products", productsRouter);
api.use("/api/orders", ordersRouter);
api.use("/api/users", usersRouter);
