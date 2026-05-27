<<<<<<< HEAD
import { createAccount, getAccountByUserId } from '../models/accountModel.js';

const createAccountService = async (userId) => {
  const existingAccount = await getAccountByUserId(userId);
  if (existingAccount) {
    throw new Error('Account already exists for this user');
  }

  const account = await createAccount(userId);
  return { message: 'Account created successfully', accountId: account.id };
};

const getAccountService = async (userId) => {
  const account = await getAccountByUserId(userId);
  if (!account) {
    throw new Error('No account found');
  }

  return account;
};

export { createAccountService, getAccountService };
=======
import { createAccount, getAccountByUserId } from '../models/accountModel.js';

const createAccountService = async (userId) => {
  const existingAccount = await getAccountByUserId(userId);
  if (existingAccount) {
    throw new Error('Account already exists for this user');
  }

  const account = await createAccount(userId);
  return { message: 'Account created successfully', accountId: account.id };
};

const getAccountService = async (userId) => {
  const account = await getAccountByUserId(userId);
  if (!account) {
    throw new Error('No account found');
  }

  return account;
};

const getBalanceService=async(userId)=>{
  const account=getAccountByUserId(userId);
  if(!account){
    throw new Error("Account not found");
  }

  return{
    balance:account.balance
  };
};

const checkIfUserBlocked = async (userId) => {

    const user = await getUserByIdModel(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.is_blocked) {
        throw new Error("Your account is blocked");
    }

    return user;
};

export { createAccountService, getAccountService, getBalanceService, checkIfUserBlocked};
>>>>>>> c77d07a (backend done)
