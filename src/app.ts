import express from "express";

import { login, register } from "../controllers/authController";
import { deleteUserProfile, getUsers, getUserProfile, putUserProfile, putUserRole, putSelfProfile } from "../controllers/userController";

import { deleteAppointmentId, getAppointments, getAppointmentId, postAppointments, putAppointmentId } from "../controllers/appointmentsController";
import { createRole, deleteRole, getRoles, updateRole } from "../controllers/roleController";
import { deleteServiceId, getServices, postServices, putServiceId } from "../controllers/serviceController";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";

export const app = express();
app.use(express.json());
app.get("/alive", (req, res) => {
    res.send("Server is alive")
})
app.get("/healthy", (req, res) => {
    res.status(200).json(
        {
            "success": true,
            "message": "Server is healthy"
        }
    )
})


////////////////////////////////////////////////////////
//             ENDPOINTS of the project:              //
////////////////////////////////////////////////////////

// Roles:
app.get("/roles", getRoles) // <--------------------------------------------- WORKING!!!  XTRA
app.post("/roles", createRole) // <------------------------------------------ WORKING!!!  XTRA
app.put("/roles/:id", updateRole) // <--------------------------------------- WORKING!!!  XTRA
app.delete("/roles/:id", deleteRole) // <------------------------------------ WORKING!!!  XTRA

// Authentication:
app.post("/api/auth/register", register) // <-------------------------------- WORKING!!!
app.post("/api/auth/login", login) // <-------------------------------------- WORKING!!!


// Users:
app.get("/api/users", auth, isSuperAdmin, getUsers) // <--------------------- WORKING!!!  XTRA (+ query search)
app.get("/api/users/:id", auth, getUserProfile) // <------------------------- WORKING!!!  
app.put("/api/users/:id", auth, putUserProfile) // <------------------------- WORKING!!!
app.put("/api/user/self", auth, putSelfProfile) // <------------------------- WORKING!!! 
app.delete("/api/users/:id", auth, isSuperAdmin, deleteUserProfile) // <----- WORKING!!!  XTRA
app.put("/api/users/:id/:role", auth, isSuperAdmin, putUserRole) // <-------- WORKING!!!  XTRA


// Appointments:
app.post("/api/appointments", auth, postAppointments) // <------------------- WORKING!!!
app.get("/api/appointments", auth, getAppointments) // <--------------------- WORKING!!!
app.get("/api/appointments/:id", auth, getAppointmentId) // <---------------- WORKING!!!
app.put("/api/appointments/:id", auth, putAppointmentId) // <---------------- WORKING!!!
app.delete("/api/appointments/:id", auth, deleteAppointmentId) // <---------- WORKING!!!


// Services:
app.post("/api/services", auth, isSuperAdmin, postServices) // <------------- WORKING!!!  XTRA
app.get("/api/services", getServices) // <----------------------------------- WORKING!!!
app.put("/api/services/:id", auth, isSuperAdmin, putServiceId) // <---------- WORKING!!!  XTRA
app.delete("/api/services/:id", auth, isSuperAdmin, deleteServiceId) // <---- WORKING!!!  XTRA
