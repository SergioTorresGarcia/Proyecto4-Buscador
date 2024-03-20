
import { Router } from "express";

export const serviceRouter = Router();

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteServiceId, getServices, postServices, putServiceId } from "../controllers/serviceController";


// Services:
serviceRouter.post("/api/services", auth, isSuperAdmin, postServices) // <------------- WORKING!!!  XTRA
serviceRouter.get("/api/services", getServices) // <----------------------------------- WORKING!!!
serviceRouter.put("/api/services/:id", auth, isSuperAdmin, putServiceId) // <---------- WORKING!!!  XTRA
serviceRouter.delete("/api/services/:id", auth, isSuperAdmin, deleteServiceId) // <---- WORKING!!!  XTRA