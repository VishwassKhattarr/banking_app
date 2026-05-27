import {
    getAllUsersModel,
    getAllTransactionsModel,
    getUserByIdModel,
    updateUserBlockStatusModel,
    getAdminStatsModel,
    getHighValueTransactionsModel
} from "../models/adminModel.js";

export const getAllUsersService = async () => {

    const users = await getAllUsersModel();

    return users;
};

export const getAllTransactionsService = async (page, limit) => {

    const transactions = await getAllTransactionsModel();

    return transactions;
};

export const getUserByIdService = async (id) => {

    const user = await getUserByIdModel(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const blockUserService = async (id) => {

    const user = await getUserByIdModel(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.is_blocked) {
        throw new Error("User is already blocked");
    }

    const updatedUser = await updateUserBlockStatusModel(id, true);

    return updatedUser;
};

export const unblockUserService = async (id) => {

    const user = await getUserByIdModel(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.is_blocked) {
        throw new Error("User is already unblocked");
    }

    const updatedUser = await updateUserBlockStatusModel(id, false);

    return updatedUser;
};

export const getAdminStatsService = async () => {

    const stats = await getAdminStatsModel();

    return stats;
};

export const getHighValueTransactionsService = async () => {

    const transactions =
        await getHighValueTransactionsModel();

    return transactions;
};