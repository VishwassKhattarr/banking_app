import express from 'express';
import  authMiddleware  from '../middlewares/authMiddleware.js';
import  adminMiddleware  from '../middlewares/authMiddleware.js';
import { getAllFraudAlerts,resolveFraudAlert } from '../controllers/fraudController.js';
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
