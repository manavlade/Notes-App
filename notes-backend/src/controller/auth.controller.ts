import { Request, Response } from "express";
import { getUserByIdService, loginService, registerService } from "../service/auth.service.js";

export const registerController = async (
    req: Request,
    res: Response
) => {
    try {

        const { name, email, password } = req.body;

        const result = await registerService(
            name,
            email,
            password
        );

        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
                success: false,
            });
        }

        return res
            .status(result.statusCode)
            .json({
                message: result.message,
                success: true,
                user: result.user,
            });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
        });

    }
}

export const loginUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { email, password } = req.body;

        const result = await loginService(
            email,
            password
        );

        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
                success: false,
            });
        }

        return res
            .status(result.statusCode)
            .cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })
            .json({
                message: result.message,
                success: true,
                user: result.user,
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

export const logoutUser = async (
    req: Request,
    res: Response
) => {

    try {

        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
            })
            .json({
                message: "Logged out successfully",
                success: true,
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};


export const getUserById = async (
    req: Request<{ userId: string }>,
    res: Response
) => {

    try {

        const { userId } = req.params;

        const result = await getUserByIdService(userId);

        return res.status(result.statusCode).json({
            message: result.message,
            success: result.success,
            user: result.user || null,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};