import { Request, Response } from "express"
import { userServices } from "./user.service"
import userValidationSchema from "./user.validation";
import { IUser } from "./user.interface";


const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body

        // data validation using Zod
        const zodParsedData = userValidationSchema.parse(userData);
        await userServices.createUser(zodParsedData);

        const responseData: Omit<IUser, "password"> = {
            userId: userData.userId,
            username: userData.username,
            fullName: userData.fullName,
            age: userData.age,
            email: userData.email,
            isActive: userData.isActive,
            hobbies: userData.hobbies,
            address: userData.address,
        };

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: responseData,
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
};


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers()

        const responseData: Array<Partial<IUser>> = result.map((user) => {
            return {
                username: user.username,
                fullName: user.fullName,
                age: user.age,
                email: user.email,
                address: user.address,
            };
        });

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: responseData,
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}


const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result = await userServices.getSingleUser(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        })
    } catch (error: any) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}


const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId)
        const userData = req.body
        const result = await userServices.updateUser(userId, userData)
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        })
    } catch (error: any) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId)
        const result = await userServices.deleteUser(userId)
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        })
    } catch (error: any) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}