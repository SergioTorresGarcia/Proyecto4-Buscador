import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { tokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // separates token from bearer
        const token = req.headers.authorization?.split(" ")[1];
        // if token is not good, blocks entry
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            })
        }
        // if token works, it decodes encrypted data within token (tokendata: userId and roleName)
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        // esos datos los pasa como tokenData como nuevos campos de la interface Request
        req.tokenData = decoded as tokenData;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "JWT not valid or malformed",
            error: error
        })
    }
}
