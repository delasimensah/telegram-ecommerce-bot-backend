import { Router } from "express";

import {
  httpGetProducts,
  httpCreateProduct,
  httpGetProduct,
  httpUpdateProduct,
  httpDeleteProduct,
} from "@routes/products/products.controller";

export const productsRouter = Router();

productsRouter.get("/", httpGetProducts);
productsRouter.get("/:id", httpGetProduct);
productsRouter.post("/", httpCreateProduct);
productsRouter.patch("/:id", httpUpdateProduct);
productsRouter.delete("/:id", httpDeleteProduct);
