import { Request, Response } from "express"
import { Appointment } from "../src/models/Appointment"
import { User } from "../src/models/User";

export const postAppointments = async (req: Request, res: Response) => {
    try {
        const { appointmentDate, userId, serviceId } = req.body

        // validate date format
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        const dateOk = regexDate.test(appointmentDate);

        if (!dateOk) {
            return res.status(404).json({
                success: false,
                message: "Incorrect date format (YYYY-MM-DD)",
            })
        }

        // save new appointment in DB
        const newAppointment = await Appointment.create({
            appointmentDate: appointmentDate,
            user: {
                id: userId
            },
            service: {
                id: serviceId
            }
        }).save()

        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: newAppointment
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Appointment cannot be created",
            error: error
        })
    }
}

export const getAppointments = async (req: Request, res: Response) => {
    try {

        let limit = Number(req.query.limit) || 10
        const page = req.query.page || 1
        const skip = (Number(page) - 1) * limit

        if (limit > 10) {
            limit = 10
        }

        const appointment = await Appointment.find({
            select: {
                id: true,
                appointmentDate: true,
                userId: true,
                serviceId: true
            },
            take: limit,
            skip: skip
        });

        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfuly",
            data: appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointments cannot be retrieved",
            error: error
        })
    }
}

export const getOwnAppointments = async (req: Request, res: Response) => {
    try {
        const profileId = req.tokenData.userId
        const user = await User.find({ where: { id: profileId } });

        let limit = Number(req.query.limit) || 10
        const page = req.query.page || 1
        const skip = (Number(page) - 1) * limit

        if (limit > 10) {
            limit = 10
        }

        const appointments = await Appointment.find({
            where: { user: { id: profileId } },
            relations: { user: true, service: true },
            select: {
                id: true,
                appointmentDate: true,
                user: { id: true },
                service: { id: true, serviceName: true }
            },
            take: limit,
            skip: skip
        });

        res.status(200).json({
            success: true,
            message: "Appointments for this profile retrieved successfuly",
            data: appointments
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointments cannot be retrieved",
            error: error
        })
    }
}

export const getAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.id)
        const appointment = await Appointment.findOneBy({
            id: appointmentId
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Appointment retrieved successfuly",
            data: appointment
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Appointment cannot be retrieved",
            error: error
        })
    }
}

export const putAppointmentId = async (req: Request, res: Response) => {
    try {
        const { appointment_date, appointment_id, service_id } = req.body;
        const userId = req.tokenData.userId
        const roleName = req.tokenData.roleName

        // validate date format
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        const dateOk = regexDate.test(appointment_date);

        if (!dateOk) {
            return res.status(404).json({
                success: false,
                message: "Incorrect date format (YYYY-MM-DD)",
            })
        }

        // validate data
        const appointment = await Appointment.findOne({
            where: {
                id: appointment_id
            },
            relations: {
                user: true,
                service: true
            },
            select: {
                id: true,
                appointmentDate: true,
                user: {
                    id: true,
                },
                service: {
                    id: true,
                }
            }
        })

        if ((roleName === "user") && (appointment!.user.id !== userId)) {
            return res.status(404).json({
                success: false,
                message: "You have no permission to modify other's appointments"
            })
        }

        const updatedAppointment = await Appointment.update(
            {
                id: appointment_id,
                user: { id: userId }
            },
            {
                appointmentDate: appointment_date,
                user: { id: userId },
                service: { id: service_id }
            }
        )

        res.status(200).json({
            success: true,
            message: "Appointment updated successfuly",
            data: updatedAppointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment cannot be updated",
            error: error
        })
    }
}

export const deleteAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;

        // validate data
        const appointment = await Appointment.findOne({
            where: {
                id: parseInt(appointmentId)
            }
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        // update DB
        await Appointment.remove(appointment)
        res.status(200).json({
            success: true,
            message: "Appointment deleted successfuly"

        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Appointment cannot be deleted",
            error: error
        })
    }
}
