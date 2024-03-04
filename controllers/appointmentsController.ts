import { Request, Response } from "express"
import { Appointment } from "../src/models/Appointment"

export const postAppointments = async (req: Request, res: Response) => {
    try {
        const { appointment_date, user_id, service_id } = req.body

        const newAppointment = await Appointment.create({
            appointmentDate: appointment_date,
            userId: user_id,
            serviceId: service_id
        }).save()

        res.status(201).json({
            success: true,
            message: "Service created successfully",
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

export const getAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.tokenData.userId

        const appointment = await Appointment.findOne({
            where: { id: appointmentId },
            relations: {
                service: true,
                user: true
            },
            select: {
                appointmentDate: true,
                service: {
                    serviceName: true
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
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
        const appointmentId = req.params.id;
        const { appointment_date, user_id, service_id } = req.body;

        // validate data
        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        const updatedAppointment = await Appointment.update(
            {
                id: parseInt(appointmentId)
            },
            {
                appointmentDate: appointment_date,
                userId: user_id,
                serviceId: service_id
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
        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
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
