import { IUser } from "./user.interface"
import User from "./user.model"


const createUser = async (userData: IUser): Promise<IUser> => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error("User already exists")
    }

    const result = await User.create(userData);
    return result
}

const getAllUsers = async (): Promise<IUser[]> => {
    const result = await User.find()
    return result
}

const getSingleUser = async (userId: number): Promise<IUser | null> => {
    if (await User.isUserExists(userId)) {
        const result = await User.findOne({ userId }, { password: 0, _id: 0, __v: 0 })
        return result
    }
    throw new Error("User not exists")
}

const updateUser = async (userId: number, userData: IUser): Promise<IUser | null> => {
    if (await User.isUserExists(userId)) {
        const result = await User.findOneAndUpdate({ userId }, userData, {
            new: true,
            runValidators: true,
            select: '-password',
        })
        return result;
    }
    throw new Error("User not exists")
}

const deleteUser = async (userId: number): Promise<IUser | null> => {
    if (await User.isUserExists(userId)) {
        const result = await User.findOneAndDelete({ userId })
        return result
    }
    throw new Error("User not exists")
}


const addProductToOrder = async (userId: number, orderData: { productName: string; price: number; quantity: number }): Promise<IUser | null> => {
    if (await User.isUserExists(userId)) {
        const user = await User.findOne({ userId });
        if (user) {

            if (!user.orders) {
                user.orders = [];
            }

            user.orders.push(orderData);
            const updatedUser = await user.save();

            return updatedUser;
        }
    }
    throw new Error("User not exists")
}

export const userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductToOrder,
}