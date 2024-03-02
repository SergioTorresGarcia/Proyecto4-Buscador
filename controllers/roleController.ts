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
        // recover info through the body
        const name = req.body.name;

        // validate input's length
        if (name.length >= 40 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

        // save data
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
        const name = req.body.name;
        const userId = parseInt(req.params.id);

        if (name.length >= 40 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

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
