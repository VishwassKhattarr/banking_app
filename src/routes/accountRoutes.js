import express from 'express';
import { createAccount, getAccount,getBalance } from '../controllers/accountController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// import { getBalance } from '../services/accountService.js';

const router = express.Router();

router.post('/', authMiddleware, createAccount);
router.get('/me', authMiddleware, getAccount);
router.get('/balance',authMiddleware,getBalance);

export default router;