import { getAccountByUserId, updateBalance } from "../models/accountModel.js";
import { createTransaction } from "../models/transactionModel.js";
import { getTransactionByAccountId } from "../models/transactionModel.js";
import {query} from '../utils/db.js';

const deposit=async(userId, amount) => {
    if(amount<=0){
        throw new Error("Invalid amount");
    }

    const account = await getAccountByUserId(userId);

    if (!account) {
    throw new Error("Account not found");
    }

    const newBalance=account.balance+amount;

    await updateBalance(account.id,newBalance);

    await createTransaction({
    senderAccountId: null,
    receiverAccountId: account.id,
    amount: amount,
    type: "deposit",
    status: "completed"
  });

   return {
    message: "Deposit successful",
    balance: newBalance
  };

};


const withdraw = async (userId, amount) => {
  // 1. Validation
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  // 2. Fetch account
  const account = await getAccountByUserId(userId);

  if (!account) {
    throw new Error("Account not found");
  }

  // 3. Check balance
  if (account.balance < amount) {
    throw new Error("Insufficient balance");
  }

  // 4. Calculate new balance
  const newBalance = account.balance - amount;

  // 5. Update balance
  await updateBalance(account.id, newBalance);

  // 6. Log transaction
  await createTransaction({
    senderAccountId: account.id,
    receiverAccountId: null,
    amount: amount,
    type: "withdraw",
    status: "completed"
  });

  // 7. Return response
  return {
    message: "Withdrawal successful",
    balance: newBalance
  };

};

const transfer = async(fromUserId, toUserId, amount) => {
    // 1. Basic Validation
    if(amount<=0){
        throw new Error("Invalid amount");
    }

    if(fromUserId===toUserId){
        throw new Error("Cannot transfer to same user");
    }

    // Start DB transaction
    await query('BEGIN');

    try{
        // 3. Fetch accounts
        const sender=await getAccountByUserId(fromUserId);
        const receiver=await getAccountByUserId(toUserId);

        if(!sender || !receiver){
            throw new Error("Account not found");
        }

        // 4. Balance check
        if(sender.balance<amount){
            throw new Error("Insufficient balance");
        }
         
        // 5. Update balances
        const senderNewBalance = sender.balance - amount;
        const receiverNewBalance = receiver.balance + amount;
        

        await updateBalance(sender.id, senderNewBalance);
        await updateBalance(receiver.id, receiverNewBalance);

        // 6. Log transaction
        await createTransaction({
        senderAccountId: sender.id,
        receiverAccountId: receiver.id,
        amount: amount,
        type: "transfer",
        status: "completed"
    });

    // 7. Commit
    await query('COMMIT');

    return {
      message: "Transfer successful",
      senderBalance: senderNewBalance
    };
    }catch(err){
        // 8. Rollback if anything fails
    await query('ROLLBACK');
    throw err;
    }
};

const getTransactionHistory = async(userId)=> {
    const account=await getAccountByUserId(userId);

    if(!account){
        throw new Error("Account not found");
    }

    const transactions=await getTransactionByAccountId(account.id);
    return transactions;
};

export {deposit, withdraw, transfer, getTransactionHistory};
