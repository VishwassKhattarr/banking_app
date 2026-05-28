import express from 'express';

import authMiddleware
from '../middlewares/authMiddleware.js';

import {
    depositController,
    withdrawController,
    transferController,
    getTransactionHistoryController
} from '../controllers/transactionController.js';



const router = express.Router();



router.post(
    "/deposit",
    authMiddleware,
    depositController
);



router.post(
    "/withdraw",
    authMiddleware,
    withdrawController
);



router.post(
    "/transfer",
    authMiddleware,
    transferController
);



router.get(
    "/history",
    authMiddleware,
    getTransactionHistoryController
);



export default router;