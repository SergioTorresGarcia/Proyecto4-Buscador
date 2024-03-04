import express from "express";

import { roleRouter } from "./routes/roleRoutes";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { serviceRouter } from "./routes/serviceRoutes";
import { appointmentRouter } from "./routes/appointmentsRoutes";

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


// ENDPOINTS of the project:

app.use('/', roleRouter)

app.use('/', authRouter)

app.use('/', userRouter)

app.use('/', serviceRouter)

app.use('/', appointmentRouter)
