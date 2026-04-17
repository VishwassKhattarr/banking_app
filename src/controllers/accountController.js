import { createAccountService, getAccountService, getBalanceService } from '../services/accountService.js';

const createAccount = async (req, res) => {
  try {
    const result = await createAccountService(req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await getAccountService(req.user.id);
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBalance=async(req,res)=>{
  try{
    const userId=req.user.id;
    const data=await getBalanceService(userId);
    return res.status(200).json(data);
  }catch(err){
    return res.status(400).json({
      error:err.message
    });
  }
};

export {createAccount,getAccount,getBalance};