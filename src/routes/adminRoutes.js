import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

import {
    getAllUsers,
    getAllTransactions,
    getUserById,
    blockUser,
    unblockUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

router.get(
    "/transactions",
    authMiddleware,
    adminMiddleware,
    getAllTransactions
);

router.get(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    getUserById
);

router.patch(
    "/users/:id/block",
    authMiddleware,
    adminMiddleware,
    blockUser
);

router.patch(
    "/users/:id/unblock",
    authMiddleware,
    adminMiddleware,
    unblockUser
);

export default router;