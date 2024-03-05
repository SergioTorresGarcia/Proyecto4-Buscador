
import { Request, Response } from "express"
import bcrypt from "bcrypt";
import { User } from "../src/models/User";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../helpers/passwordValidation";
import { isValidEmail } from "../helpers/emailValidation";
import { Role } from "../src/models/Role";


export const register = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const passValid = isValidPassword(password)
        const emailValid = isValidEmail(email)

        const newUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: emailValid,
            passwordHash: passValid,
            role: { id: 1 }
        }).save()

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "User cannot be registered",
            error: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // recover info
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed"
            })
        }

        // searh for user in DB
        const user = await User.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                id: true,
                passwordHash: true,
                email: true,
                role: {
                    name: true
                }
            }
        })

        // error if it does not exist
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // if it does exist: compare passwords
        const isValidPassword = bcrypt.compareSync(password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and password invalid"
            })
        }

        // if password is correct, create TOKEN and log in
        const token = jwt.sign({
            userId: user.id,
            roleName: user.role.name
        },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "72h" // optional variable parameter
            }
        )

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be logged in",
            error: error
        })
    }
}
