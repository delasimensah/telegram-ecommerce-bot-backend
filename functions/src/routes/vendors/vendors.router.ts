import { Router } from "express";

import { httpGetVendor, httpUpdateVendor } from "./vendors.controller";

export const vendorsRouter = Router();

vendorsRouter.get("/:id", httpGetVendor);
vendorsRouter.patch("/:id", httpUpdateVendor);
