import express from 'express';
import { createAccount, getAccount } from '../controllers/accountController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createAccount);
router.get('/me', authMiddleware, getAccount);

export default router;