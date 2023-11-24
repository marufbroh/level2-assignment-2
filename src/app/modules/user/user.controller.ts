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
}

export const userController = {
    createUser,
    // getAllUsers,
    // getSingleUser,
    // updateUser,
    // deleteUser,
}