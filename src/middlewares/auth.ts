import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { tokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log("Soy el auth middleware");

        //separa el token del bearer
        const token = req.headers.authorization?.split(" ")[1];
        //si no funciona el token me echa
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            })
        }
        // si funciona recupera (decodea) los datos encriptados)
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log(decoded);

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