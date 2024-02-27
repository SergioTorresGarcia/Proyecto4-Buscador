import { Request, Response } from "express"

export const getAppointments = (req: Request, res: Response) => {
    res.status(200).json({
        "success": true,
        "message": "Appointments retrieved successfuly"
    })
}
export const createAppointment = (req: Request, res: Response) => {
    req.body;

    res.status(201).json({
        "success": true,
        "message": "Appointment created successfuly"
    })
}
export const updateAppointment = (req: Request, res: Response) => {
    req.body;
    req.params.id;

    res.status(200).json({
        "success": true,
        "message": "Appointment updated successfuly"
    })
}
export const deleteAppointment = (req: Request, res: Response) => {
    req.params.id;
    console.log(req.params.id);

    res.status(200).json({
        "success": true,
        "message": "Appointment deleted successfuly"
    })
}