import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/authMiddleware';
import { getAllFraudAlerts,resolveFraudAlert } from '../controllers/fraudController';
const router=express.Router();


router.get(
    "/alerts",
    authMiddleware,
    adminMiddleware,
    getAllFraudAlerts
);

router.patch(
    "/alerts/:id/resolve",
    authMiddleware,
    adminMiddleware,
    resolveFraudAlert
);

export default router;
