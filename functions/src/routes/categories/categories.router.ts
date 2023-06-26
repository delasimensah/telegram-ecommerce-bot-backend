import { Router } from "express";

import {
  httpGetCategories,
  httpCreateCategory,
  httpGetCategory,
  httpDeleteCategory,
  httpUpdateCategory,
} from "./categories.controller";

export const categoriesRouter = Router();

categoriesRouter.get("/", httpGetCategories);
categoriesRouter.get("/:id", httpGetCategory);
categoriesRouter.post("/", httpCreateCategory);
categoriesRouter.patch("/:id", httpUpdateCategory);
categoriesRouter.delete("/:id", httpDeleteCategory);
