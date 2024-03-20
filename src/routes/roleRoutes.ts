
import { Router } from "express";

export const roleRouter = Router();

import { createRole, deleteRole, getRoles, updateRole } from "../controllers/roleController"

// Roles:
roleRouter.get("/roles", getRoles) // <--------------------------------------------- WORKING!!!  XTRA
roleRouter.post("/roles", createRole) // <------------------------------------------ WORKING!!!  XTRA
roleRouter.put("/roles/:id", updateRole) // <--------------------------------------- WORKING!!!  XTRA
roleRouter.delete("/roles/:id", deleteRole) // <------------------------------------ WORKING!!!  XTRA
