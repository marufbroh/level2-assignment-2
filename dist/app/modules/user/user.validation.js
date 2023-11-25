"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'Product name is required' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a non-negative number' }),
    quantity: zod_1.z.number().int().min(1, { message: 'Quantity must be at least 1' }),
});
exports.orderValidationSchema = orderValidationSchema;
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().min(1, { message: "UserId is required" }),
    username: zod_1.z.string().min(1, { message: 'Username is required' }),
    password: zod_1.z.string().min(1, { message: 'Password is required' }),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
        lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
    }),
    age: zod_1.z.number().int().positive().refine(value => value >= 1, { message: 'Age must be a positive integer' }),
    email: zod_1.z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email is not a valid email type" }),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()).min(1, { message: 'Hobbies are required' }),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1, { message: 'Street is required' }),
        city: zod_1.z.string().min(1, { message: 'City is required' }),
        country: zod_1.z.string().min(1, { message: 'Country is required' }),
    }),
    orders: zod_1.z.array(orderValidationSchema).optional(),
});
exports.userValidationSchema = userValidationSchema;
