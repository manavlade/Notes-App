import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export interface AuthRequest<
    P = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: JwtPayload;
}

export const isAuthenticated = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if (!decoded.userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        req.user = decoded;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid Token",
            success: false,
        });
    }
};