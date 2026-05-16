import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import prisma from "../config/prisma.js";

export const registerService = async (
    name: string,
    email: string,
    password: string,
) => {

    if (!name || !email || !password) {
        return {
            success: false,
            statusCode: 400,
            message: "Insufficient Data",
        }
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return {
            success: false,
            statusCode: 400,
            message: "User already exists",
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });

    return user;
}

export const loginService = async (
    email: string,
    password: string
) => {

    if (!email || !password) {
        return {
            success: false,
            statusCode: 400,
            message: "All fields are required"
        };
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid credentials"
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid credentials"
        };
    }

    const tokenData = {
        userId: user.id,
        name: user.name
    }

    const token = jwt.sign(
        tokenData,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );

    const sanitizedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
    };

    return {
        success: true,
        statusCode: 200,
        message: `Welcome back ${user.name}`,
        token,
        user: sanitizedUser,
    }
}


export const getUserByIdService = async (
    userId: string
) => {

    if (!userId) {
        return {
            success: false,
            statusCode: 400,
            message: "User ID is required"
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },

        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            notes: true,
        },
    });

    if(!user) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found"
        };
    }

    return {
        success: true,
        statusCode: 200,
        message: "Logged out successfully",
        user
    }
}