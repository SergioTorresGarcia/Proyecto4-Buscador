import { Request, Response } from "express"
import { Service } from "../src/models/Service";

export const getServices = async (req: Request, res: Response) => {
    try {

        const services = await Service.find({
            select: {
                id: true,
                serviceName: true,
                description: true
            }
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
export const updateService = (req: Request, res: Response) => {
    req.body;
    req.params.id;

    res.status(200).json({
        "success": true,
        "message": "Service updated successfuly"
    })
}
export const deleteService = (req: Request, res: Response) => {
    req.params.id;
    console.log(req.params.id);

    res.status(200).json({
        "success": true,
        "message": "Service deleted successfuly"
    })
}