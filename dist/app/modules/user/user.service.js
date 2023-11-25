"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userData.userId)) {
        throw new Error('User already exists');
    }
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const result = yield user_model_1.default.findOne({ userId }, { password: 0, _id: 0, __v: 0, orders: 0 });
        return result;
    }
    throw new Error('User not exists');
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const result = yield user_model_1.default.findOneAndUpdate({ userId }, userData, {
            new: true,
            runValidators: true,
            select: '-password',
        });
        return result;
    }
    throw new Error('User not exists');
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const result = yield user_model_1.default.findOneAndDelete({ userId });
        return result;
    }
    throw new Error('User not exists');
});
const addProductToOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const user = yield user_model_1.default.findOne({ userId });
        if (user) {
            if (!user.orders) {
                user.orders = [];
            }
            user.orders.push(orderData);
            const updatedUser = yield user.save();
            return updatedUser;
        }
    }
    throw new Error('User not exists');
});
const getOrdersFromUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const user = yield user_model_1.default.findOne({ userId });
        if (user === null || user === void 0 ? void 0 : user.orders) {
            return { orders: user.orders };
        }
    }
    throw new Error('User not exists');
});
const getTotalPriceOfOrdersFromUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const user = yield user_model_1.default.findOne({ userId });
        if (user === null || user === void 0 ? void 0 : user.orders) {
            const totalPrice = user.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
            return { totalPrice: totalPrice };
        }
    }
    throw new Error('User not exists');
});
exports.userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductToOrder,
    getOrdersFromUser,
    getTotalPriceOfOrdersFromUser,
};
