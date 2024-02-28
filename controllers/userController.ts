import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../src/models/User";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Users retrieved successfuly",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users cannot be retrieved",
            error: error
        })
    }

}

export const getUsersProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved successfuly",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users cannot be retrieved",
            error: error
        })
    }

}

export const putUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, email, password } = req.body;

        // validar datos
        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // tratar datos (si corresponde)
        // validación password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password invalid"
            })
        }
        const passwordEncrypted = bcrypt.hashSync(password, 8)

        // validación email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }

        // actualizar DB
        const updatedUser = await User.update(
            {
                id: parseInt(userId)
            },
            {
                firstName: first_name,
                lastName: last_name,
                email: email,
                passwordHash: passwordEncrypted
            }
        )

        res.status(200).json({
            success: true,
            message: "User updated successfuly",
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be updated",
            error: error
        })

    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // validar datos
        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // actualizar DB
        await User.remove(user)
        res.status(200).json({
            success: true,
            message: "User deleted successfuly"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be deleted",
            error: error
        })
    }
}