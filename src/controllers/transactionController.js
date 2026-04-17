import { deposit,withdraw,transfer } from "../services/transactionService.js";
import { getTransactionHistory } from "../services/transactionService.js";

const depositController = async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 from middleware
    const { amount } = req.body;

    const result = await deposit(userId, amount);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const withdrawController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    const result = await withdraw(userId, amount);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const transferController = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const { toUserId, amount } = req.body;

    const result = await transfer(fromUserId, toUserId, amount);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getTransactionHistoryController=async(req,res)=>{
    try{
        const userId=req.user.id;
        const transactions =await getTransactionHistory(userId);
        return res.status(200).json(transactions);
    }catch (err){
        return res.status(400).json({
            error:err.message
        });
    }
};

export {depositController,withdrawController,transferController,getTransactionHistoryController};