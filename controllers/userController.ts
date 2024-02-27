import { Request, Response } from "express"

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        "success": true,
        "message": "Users retrieved successfuly"
    })
}
export const createUser = (req: Request, res: Response) => {
    req.body;

    res.status(201).json({
        "success": true,
        "message": "User created successfuly"
    })
}
export const updateUser = (req: Request, res: Response) => {
    req.body;
    req.params.id;

    res.status(200).json({
        "success": true,
        "message": "User updated successfuly"
    })
}
export const deleteUser = (req: Request, res: Response) => {
    req.params.id;
    console.log(req.params.id);

    res.status(200).json({
        "success": true,
        "message": "User deleted successfuly"
    })
}