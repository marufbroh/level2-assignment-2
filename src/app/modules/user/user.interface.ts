import { Model } from "mongoose";

interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
        street: string;
        city: string;
        country: string;
    };
}

interface IUserModel extends Model<IUser> {
    isUserExists(userId: string): Promise<IUser | null>
}

export { IUser, IUserModel }