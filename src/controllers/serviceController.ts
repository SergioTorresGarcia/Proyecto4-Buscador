import { Request, Response } from "express"
import { Service } from "../models/Service";


export const postServices = async (req: Request, res: Response) => {
    try {
        const { service_name, description } = req.body

        const newService = await Service.create({
            serviceName: service_name,
            description: description
        }).save()

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Service cannot be created",
            error: error
        })
    }
}

export const getServices = async (req: Request, res: Response) => {
    try {

        let limit = Number(req.query.limit) || 10
        const page = req.query.page || 1
        const skip = (Number(page) - 1) * limit

        if (limit > 10) {
            limit = 10
        }

        const services = await Service.find({
            select: {
                id: true,
                serviceName: true,
                description: true
            },
            take: limit,
            skip: skip
        });

        res.status(200).json({
            success: true,
            message: "Services retrieved successfuly",
            data: services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Services cannot be retrieved",
            error: error
        })
    }
}

export const putServiceId = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;
        const { service_name, description } = req.body;

        // validate data
        const service = await Service.findOne({
            where: {
                id: parseInt(serviceId)
            }
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const updatedService = await Service.update(
            {
                id: parseInt(serviceId)
            },
            {
                serviceName: service_name,
                description: description
            }
        )

        res.status(200).json({
            success: true,
            message: "Service updated successfuly",
            data: updatedService
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Service cannot be updated",
            error: error
        })
    }
}

export const deleteServiceId = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;

        // validate data
        const service = await Service.findOne({
            where: {
                id: parseInt(serviceId)
            }
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        // update DB
        await Service.remove(service)
        res.status(200).json({
            success: true,
            message: "Service deleted successfuly"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Service cannot be deleted",
            error: error
        })
    }
}