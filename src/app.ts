import express from "express";

import { login, register } from "../controllers/authController";
import { deleteUserProfile, getUsers, getUserProfile, putUserProfile } from "../controllers/userController";

import { deleteAppointmentId, getAppointments, getAppointmentId, postAppointments, putAppointmentId } from "../controllers/appointmentsController";
// import { createRole, deleteRole, getRoles, updateRole } from "../controllers/roleController";
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
//             ENDPOINTS del proyecto:                //
////////////////////////////////////////////////////////

// TABLE 1 - roles routes
// app.get("/roles", getRoles)
// app.post("/roles", createRole)
// app.put("/roles/:id", updateRole)
// app.delete("/roles/:id", deleteRole)

// Autenticación:
app.post("/api/auth/register", register) // <-------------------------------- WORKING!!!
app.post("/api/auth/login", login) // <-------------------------------------- WORKING!!!


// Usuarios:
app.get("/api/users", auth, isSuperAdmin, getUsers) // <----------------------------------------- WORKING!!!
app.get("/api/users/:id", auth, getUserProfile) // <------------------------------- WORKING!!!  
app.put("/api/users/:id", putUserProfile) // <------------------------------- WORKING!!! 
//     GET /api/users?email=ejemplo@ejemplo.com (super_admin) XTRA
app.delete("/api/users/:id", isSuperAdmin, deleteUserProfile) // <------------------------- WORKING!!!  XTRA
// app.put("/api/users/:id/role", putUserRole)//     PUT /api/users/:id/role (super_admin) XTRA


// Citas:
app.post("/api/appointments", postAppointments) // <------------------------- WORKING!!!
app.get("/api/appointments", getAppointments) // <--------------------------- WORKING!!!
app.get("/api/appointments/:id", getAppointmentId) // <---------------------- WORKING!!!
app.put("/api/appointments/:id", putAppointmentId) // <---------------------- WORKING!!!
app.delete("/api/appointments/:id", deleteAppointmentId) // <---------------- WORKING!!!


// Servicios:
app.post("/api/services", isSuperAdmin, postServices) // <--------------------------------- WORKING!!! XTRA
app.get("/api/services", getServices) // <------------------------------------------------- WORKING!!!
app.put("/api/services/:id", isSuperAdmin, putServiceId) // <------------------------------ WORKING!!! XTRA
app.delete("/api/services/:id", isSuperAdmin, deleteServiceId) // <------------------------ WORKING!!! XTRA



// REVISAR Y COMPLETAR VALIDACIONES!!!!!!!!!!!!!!