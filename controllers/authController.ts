
import { Request, Response } from "express"
import bcrypt from "bcrypt";
import { User } from "../src/models/User";


export const register = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body

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
        const newUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            passwordHash: passwordEncrypted,
            role: { id: 3 }
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

// export const login = (req: Request, res: Response) => {
//     try {
//         res.status(201).json({
//             success: true,
//             message: "User logged in successfully"
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "User cannot be logged in",
//             error: error
//         })
//     }
// }
