import {
    getAccountByUserId,
    updateBalance
} from "../models/accountModel.js";

import {
    createTransaction,
    getTransactionByAccountId
} from "../models/transactionModel.js";

import { query } from "../utils/db.js";

import { getUserByIdModel } from "../models/adminModel.js";

import {
    detectRapidTransactions
} from "./fraud/fraudService.js";



export const checkIfUserBlocked = async (userId) => {

    const user = await getUserByIdModel(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.is_blocked) {
        throw new Error("Your account is blocked");
    }

    return user;
};



const deposit = async (userId, amount) => {

    await checkIfUserBlocked(userId);

    // Validation
    if (amount <= 0) {
        throw new Error("Invalid amount");
    }

    // Fetch account
    const account = await getAccountByUserId(userId);

    if (!account) {
        throw new Error("Account not found");
    }

    // Calculate new balance
    const newBalance = account.balance + amount;

    // Update balance
    await updateBalance(account.id, newBalance);

    // Create transaction
    const transaction = await createTransaction({
        senderAccountId: null,
        receiverAccountId: account.id,
        amount: amount,
        type: "deposit",
        status: "completed"
    });

    // Fraud detection
    await detectRapidTransactions(
        userId,
        transaction.id
    );

    return {
        message: "Deposit successful",
        balance: newBalance
    };
};



const withdraw = async (userId, amount) => {

    await checkIfUserBlocked(userId);

    // Validation
    if (amount <= 0) {
        throw new Error("Invalid amount");
    }

    // Fetch account
    const account = await getAccountByUserId(userId);

    if (!account) {
        throw new Error("Account not found");
    }

    // Balance check
    if (account.balance < amount) {
        throw new Error("Insufficient balance");
    }

    // Calculate new balance
    const newBalance = account.balance - amount;

    // Update balance
    await updateBalance(account.id, newBalance);

    // Create transaction
    const transaction = await createTransaction({
        senderAccountId: account.id,
        receiverAccountId: null,
        amount: amount,
        type: "withdraw",
        status: "completed"
    });

    // Fraud detection
    await detectRapidTransactions(
        userId,
        transaction.id
    );

    return {
        message: "Withdrawal successful",
        balance: newBalance
    };
};



const transfer = async (
    fromUserId,
    toUserId,
    amount
) => {

    // Validation
    if (amount <= 0) {
        throw new Error("Invalid amount");
    }

    if (fromUserId === toUserId) {
        throw new Error("Cannot transfer to same user");
    }

    // Blocked user checks
    await checkIfUserBlocked(fromUserId);
    await checkIfUserBlocked(toUserId);

    // Start DB transaction
    await query("BEGIN");

    try {

        // Fetch accounts
        const sender =
            await getAccountByUserId(fromUserId);

        const receiver =
            await getAccountByUserId(toUserId);

        if (!sender || !receiver) {
            throw new Error("Account not found");
        }

        // Balance check
        if (sender.balance < amount) {
            throw new Error("Insufficient balance");
        }

        // Calculate balances
        const senderNewBalance =
            sender.balance - amount;

        const receiverNewBalance =
            receiver.balance + amount;

        // Update balances
        await updateBalance(
            sender.id,
            senderNewBalance
        );

        await updateBalance(
            receiver.id,
            receiverNewBalance
        );

        // Create transaction
        const transaction =
            await createTransaction({
                senderAccountId: sender.id,
                receiverAccountId: receiver.id,
                amount: amount,
                type: "transfer",
                status: "completed"
            });

        // Commit transaction
        await query("COMMIT");

        // Fraud detection
        await detectRapidTransactions(
            fromUserId,
            transaction.id
        );

        return {
            message: "Transfer successful",
            senderBalance: senderNewBalance
        };

    } catch (error) {

        // Rollback on failure
        await query("ROLLBACK");

        throw error;
    }
};



const getTransactionHistory = async (userId) => {

    await checkIfUserBlocked(userId);

    const account =
        await getAccountByUserId(userId);

    if (!account) {
        throw new Error("Account not found");
    }

    const transactions =
        await getTransactionByAccountId(
            account.id
        );

    return transactions;
};



export {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory
};