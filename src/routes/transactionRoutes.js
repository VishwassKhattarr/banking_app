import express from "express";
import { depositController,withdrawController,transferController,getTransactionHistoryController } from "../controllers/transactionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post('/deposit',authMiddleware,depositController);
router.post('/withdraw',authMiddleware,withdrawController);
router.post('/transfer',authMiddleware,transferController);
router.get('/',authMiddleware,getTransactionHistoryController);

export default router;