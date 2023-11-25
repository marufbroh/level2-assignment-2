import { z } from 'zod';

const orderValidationSchema = z.object({
    productName: z.string().min(1, { message: 'Product name is required' }),
    price: z.number().min(0, { message: 'Price must be a non-negative number' }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const userValidationSchema = z.object({
    userId: z.number().min(1, { message: "UserId is required" }),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    fullName: z.object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
    }),
    age: z.number().int().positive().refine(value => value >= 1, { message: 'Age must be a positive integer' }),
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email is not a valid email type" }),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()).min(1, { message: 'Hobbies are required' }),
    address: z.object({
        street: z.string().min(1, { message: 'Street is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        country: z.string().min(1, { message: 'Country is required' }),
    }),
    orders: z.array(orderValidationSchema).optional(),
});

export { userValidationSchema, orderValidationSchema };