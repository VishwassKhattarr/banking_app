import {
    getAllFraudAlertsService,
    resolveFraudAlertService
} from '../services/fraud/fraudAdminService.js';

export const getAllFraudAlerts = async (
    req,
    res
) => {

    try {

        const alerts =
            await getAllFraudAlertsService();

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const resolveFraudAlert = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const updatedAlert =
            await resolveFraudAlertService(id);

        res.status(200).json({
            success: true,
            message: "Fraud alert resolved",
            alert: updatedAlert
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
           }
};
