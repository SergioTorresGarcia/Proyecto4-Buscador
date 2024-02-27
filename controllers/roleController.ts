import { Request, Response } from "express"

export const getRoles = (req: Request, res: Response) => {
    res.status(200).json({
        "success": true,
        "message": "Roles retrieved successfuly"
    })
}
export const createRole = (req: Request, res: Response) => {
    req.body;

    res.status(201).json({
        "success": true,
        "message": "Role created successfuly"
    })
}
export const updateRole = (req: Request, res: Response) => {
    req.body;
    req.params.id;

    res.status(200).json({
        "success": true,
        "message": "Role updated successfuly"
    })
}
export const deleteRole = (req: Request, res: Response) => {
    req.params.id;
    console.log(req.params.id);

    res.status(200).json({
        "success": true,
        "message": "Role deleted successfuly"
    })
}