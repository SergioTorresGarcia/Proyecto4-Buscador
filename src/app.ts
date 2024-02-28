import express from "express";

import { register } from "../controllers/authController";
import { deleteUser, getUsers, getUsersProfile, putUserProfile } from "../controllers/userController";

import { getAppointments } from "../controllers/appointmentsController";
import { createRole, deleteRole, getRoles, updateRole } from "../controllers/roleController";
import { getServices, postServices } from "../controllers/serviceController";

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

app.get("/api/users", getUsers) // <--------------------------------- WORKING!!! (falta filtro super_admin)
app.get("/api/users/:id", getUsersProfile) // <--------------------------------- WORKING!!!  
app.put("/api/users/:id", putUserProfile) // <--------------------------------- WORKING!!! 
//     GET /api/users?email=ejemplo@ejemplo.com (super_admin) XTRA
app.delete("/api/users/:id", deleteUser) // <--------------------------------- WORKING!!!  (falta super_admin) XTRA
// app.put("/api/users/:id/role", putUserRole)//     PUT /api/users/:id/role (super_admin) XTRA


// Citas:

// app.post("/api/appointments", postAppointments) // POST /api/appointments
// app.put("/api/appointments", putAppointments) // PUT /api/appointments
// app.get("/api/appointments/:id", getAppointmentsId) // GET /api/appointments/:id
// app.get("/api/appointments", getAppointments) // GET /api/appointments


// Servicios:

app.get("/api/services", getServices) // <--------------------------------- WORKING!!!

app.post("/api/services", postServices) // <--------------------------------- WORKING!!! (falta super_admin) XTRA
// app.put("/api/services/:id", putServicesId) // PUT /api/services/:id (super_admin) XTRA
// app.delete("/api/services", deleteServices) // DELETE /api/services/:id (super_admin) XTRA

