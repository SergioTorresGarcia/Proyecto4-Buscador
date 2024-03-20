
import { Router } from "express";

export const authRouter = Router();

import { login, register } from "../controllers/authController";

// Authorisation:
authRouter.post("/api/auth/register", register) // <-------------------------------- WORKING!!!
authRouter.post("/api/auth/login", login) // <-------------------------------------- WORKING!!!
