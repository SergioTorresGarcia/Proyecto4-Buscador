import { Request, Response } from "express";
import { User } from "../models/User";
import { FindOperator, Like } from "typeorm";
import { isValidPassword } from "../helpers/passwordValidation"
import { isValidEmail } from "../helpers/emailValidation";

export const getUsers = async (req: Request, res: Response) => {
    try {
        interface queryFilters {
            email?: FindOperator<string>,
            firstName?: FindOperator<string>
        }

        const queryFilters: queryFilters = {}

        // simple version
        // if (req.query.email) { queryFilter.email = email as string } 
        // if (req.query.name) { queryFilter.name = name as string }

        // advanced version, it searches dinamically (i.e. "email contains XXX")
        if (req.query.email) {
            queryFilters.email = Like("%" + req.query.email.toString() + "%");
        }
        if (req.query.firstName) {
            queryFilters.firstName = Like("%" + req.query.firstName.toString() + "%");
        }

        let limit = Number(req.query.limit) || 10
        const page = req.query.page || 1
        const skip = (Number(page) - 1) * limit

        if (limit > 10) {
            limit = 10
        }

        const users = await User.find({

            where: queryFilters,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                birthDate: true
            },
            take: limit,
            skip: skip,
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
        const userId = req.tokenData.userId;
        const user = await User.findOne({
            where: {
                id: userId
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
        const userId = parseInt(req.params.id);
        const { first_name, last_name, email, password } = req.body;

        // validate data
        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const pass = isValidPassword(password)
        const emailValid = isValidEmail(email)

        // update DB
        const updatedUser = await User.update(
            {
                firstName: first_name,
                lastName: last_name,
                email: emailValid,
                passwordHash: pass
            },
            {
                id: userId
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
        const meId = req.tokenData.userId;
        console.log(meId);

        const { first_name, last_name, birth_date, email } = req.body;

        const emailValid = isValidEmail(email)

        const userProfile = await User.findOne({
            where: {
                id: meId
            }
        });
        console.log(userProfile);

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update user attributes
        userProfile.firstName = first_name as string;
        userProfile.lastName = last_name as string;
        userProfile.birthDate = birth_date as string;
        userProfile.email = emailValid as string;

        // Save changes to the database
        const updatedProfile = await userProfile.save();


        console.log(updatedProfile);

        res.status(200).json({
            success: true,
            message: "Your profile has been updated successfuly",
            data: updatedProfile
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Your profile cannot be updated",
            error: error
        })

    }
}



export const putUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const roleId = req.params.role;

        // validate data
        const user = await User.findOne({
            where: {
                id: parseInt(userId)
            }
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
        const user = await User.findOne({
            where: {
                id: parseInt(userId)
            }
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
