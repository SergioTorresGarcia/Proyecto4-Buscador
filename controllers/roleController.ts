import { Request, Response } from "express"
import { Role } from "../src/models/Role";

export const getRoles = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Roles retrieved successfuly"
    })
    console.log(req.body);

}
export const createRole = async (req: Request, res: Response) => {
    try {
        // recuperar la info a traves del body
        const name = req.body.name;

        // validación del largo del input
        if (name.length >= 40 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

        // podriamos tratar el dato

        // guardamos el dato
        const newRole = await Role.create({
            name: name
        }).save()

        res.status(201).json({
            success: true,
            message: "Role created successfuly",
            data: newRole
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role cannot be created",
            error: error
        })
    }
}

export const updateRole = async (req: Request, res: Response) => {

    try {
        // recuperar la info a traves del body
        const name = req.body.name;
        const userId = parseInt(req.params.id);

        // validación del largo del input
        if (name.length >= 40 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

        // podriamos tratar el dato

        // guardamos el dato
        const newRole = await Role.update(
            { name: name },
            { id: userId }
        )


        res.status(200).json({
            success: true,
            message: "Role updated successfuly",
            data: newRole
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role was not updated",
            error: error
        })
    }
}
export const deleteRole = (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        Role.delete(
            { id: userId }
        )

        res.status(200).json({
            "success": true,
            "message": "Role deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role was not updated",
            error: error
        })
    }
}