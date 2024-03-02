import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../src/models/User";
import { FindOperator, Like } from "typeorm";


export const getUsers = async (req: Request, res: Response) => {
    try {
        interface queryFilters {
            email?: FindOperator<string>,
            name?: FindOperator<string>
        }

        const queryFilters: queryFilters = {}

        // simple version
        // if (req.query.email) { queryFilter.email = email as string } 
        // if (req.query.name) { queryFilter.name = name as string }

        // advanced version, it searches dinamically (i.e. "email contains XXX")
        if (req.query.email) {
            queryFilters.email = Like("%" + req.query.email.toString() + "%");
        }
        if (req.query.name) {
            queryFilters.name = Like("%" + req.query.name.toString() + "%");
        }

        const users = await User.find({

            where: queryFilters,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
            relations: {
                role: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Users retrieved successfuly",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users cannot be retrieved",
            error: error
        })
    }

}

export const getUserProfile = async (req: Request, res: Response) => {
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

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const userEmail = req.query.email as string
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.find({
            where: {
                email: userEmail
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfuly",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be retrieved",
            error: error
        })
    }

}

export const putUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, email, password } = req.body;

        // validate data
        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // validate password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password invalid"
            })
        }
        const passwordEncrypted = bcrypt.hashSync(password, 8)

        // validate email
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }

        // update DB
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

export const putSelfProfile = async (req: Request, res: Response) => {
    try {
        const userSelf = req.tokenData.userId;
        const { first_name, last_name, email, password } = req.body;

        // validate password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password invalid"
            })
        }
        const passwordEncrypted = bcrypt.hashSync(password, 8)

        // update DB
        const updatedUser = await User.update(
            {
                id: userSelf
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

export const putUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const roleId = req.params.role;

        // validate data
        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // update DB
        const updatedUserRole = await User.update(
            {
                id: parseInt(userId)
            },
            {
                role: { id: parseInt(roleId) }
            }
        )

        res.status(200).json({
            success: true,
            message: "User's role updated successfuly",
            data: updatedUserRole
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User's role cannot be updated",
            error: error
        })

    }
}

export const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        // validate data
        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // update DB
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
