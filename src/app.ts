import express from "express";

import { register } from "../controllers/authController";
import { deleteUser, getUsers, getUsersProfile, putUserProfile } from "../controllers/userController";

import { deleteAppointmentById, getAppointments, getAppointmentsId, postAppointments, putAppointmentsId } from "../controllers/appointmentsController";
import { createRole, deleteRole, getRoles, updateRole } from "../controllers/roleController";
import { deleteService, getServices, postServices, putServicesId } from "../controllers/serviceController";

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
app.post("/api/auth/register", register) // <--------------------------------- WORKING!!!
// POST /api/auth/login <------------------------ pending


// Usuarios:
app.get("/api/users", getUsers) // <------------------------------------------ WORKING!!! (falta super_admin)
app.get("/api/users/:id", getUsersProfile) // <------------------------------- WORKING!!!  
app.put("/api/users/:id", putUserProfile) // <-------------------------------- WORKING!!! 
//     GET /api/users?email=ejemplo@ejemplo.com (super_admin) XTRA
app.delete("/api/users/:id", deleteUser) // <--------------------------------- WORKING!!!  (falta super_admin) XTRA
// app.put("/api/users/:id/role", putUserRole)//     PUT /api/users/:id/role (super_admin) XTRA


// Citas:
app.post("/api/appointments", postAppointments) // <------------------------- WORKING!!!
app.put("/api/appointments/:id", putAppointmentsId) // <--------------------- WORKING!!!
app.get("/api/appointments/:id", getAppointmentsId) // <--------------------- WORKING!!!
app.get("/api/appointments", getAppointments) // <--------------------------- WORKING!!!
app.delete("/api/appointments/:id", deleteAppointmentById) // <-------------- WORKING!!!


// Servicios:
app.get("/api/services", getServices) // <----------------------------------- WORKING!!!
app.post("/api/services", postServices) // <--------------------------------- WORKING!!! (falta super_admin) XTRA
app.put("/api/services/:id", putServicesId) // <----------------------------- WORKING!!! (falta super_admin) XTRA
app.delete("/api/services/:id", deleteService) // <-------------------------- WORKING!!! (falta super_admin) XTRA

