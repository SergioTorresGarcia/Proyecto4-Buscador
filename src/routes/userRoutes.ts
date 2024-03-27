
import { Router } from "express";

export const userRouter = Router();

import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteUserProfile, getUserProfile, getUsers, putSelfProfile, putUserProfile, putUserRole } from "../controllers/userController";

// Users:
userRouter.get("/api/users", auth, isSuperAdmin, getUsers) // <--------------------- WORKING!!!  XTRA (+ query search)
userRouter.get("/api/users/self", auth, getUserProfile) // <------------------------- WORKING!!!  
userRouter.put("/api/users/self", auth, putSelfProfile) // <------------------------- WORKING!!! 
userRouter.put("/api/users/:id", auth, putUserProfile) // <------------------------- WORKING!!!
userRouter.delete("/api/users/:id", auth, isSuperAdmin, deleteUserProfile) // <----- WORKING!!!  XTRA
userRouter.put("/api/users/:id/:role", auth, isSuperAdmin, putUserRole) // <-------- WORKING!!!  XTRA