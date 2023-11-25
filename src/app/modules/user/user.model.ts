import { Schema, model } from "mongoose";
import { IOrders, IUser, IUserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const orderSchema = new Schema<IOrders>({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a non-negative number'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
    },
});

const userSchema = new Schema<IUser, IUserModel>({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    isActive: {
        type: Boolean,
        required: [true, 'isActive status is required'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
    },
    orders: [orderSchema],
});


userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    next();
})


userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
}

const User = model<IUser, IUserModel>('User', userSchema);

export default User;