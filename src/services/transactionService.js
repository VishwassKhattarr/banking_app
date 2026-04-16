import { getAccountByUserId, updateBalance } from "../models/accountModel.js";
import { createTransaction } from "../models/transactionModel.js";

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

export {deposit};
