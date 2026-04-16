import express from "express";
import { depositController,withdrawController,transferController } from "../controllers/transactionController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router=express.Router();

router.post('/deposit',authMiddleware,depositController);
router.post('/withdraw',authMiddleware,withdrawController);
router.post('/transfer',authMiddleware,withdrawController);

export default router;