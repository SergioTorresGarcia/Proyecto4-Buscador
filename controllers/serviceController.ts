import { Request, Response } from "express"

export const getServices = (req: Request, res: Response) => {
    res.status(200).json({
        "success": true,
        "message": "Services retrieved successfuly"
    })
}
export const createService = (req: Request, res: Response) => {
    req.body;

    res.status(201).json({
        "success": true,
        "message": "Service created successfuly"
    })
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