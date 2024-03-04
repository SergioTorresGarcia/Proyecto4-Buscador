
import { Router } from "express";

export const appointmentRouter = Router();

import { auth } from "../middlewares/auth";
import { deleteAppointmentId, getAppointmentId, getAppointments, postAppointments, putAppointmentId } from "../../controllers/appointmentsController";


// Appointments:
appointmentRouter.post("/api/appointments", auth, postAppointments) // <------------------- WORKING!!!
appointmentRouter.get("/api/appointments", auth, getAppointments) // <--------------------- WORKING!!!
appointmentRouter.get("/api/appointments/:id", auth, getAppointmentId) // <---------------- WORKING!!!
appointmentRouter.put("/api/appointments/:id", auth, putAppointmentId) // <---------------- WORKING!!!
appointmentRouter.delete("/api/appointments/:id", auth, deleteAppointmentId) // <---------- WORKING!!!

