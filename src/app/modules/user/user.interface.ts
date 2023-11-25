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
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number): Promise<IUser | null>
}

export { IUser, IUserModel }