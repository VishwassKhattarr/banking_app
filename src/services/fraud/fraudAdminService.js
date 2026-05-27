import {
    getAllFraudAlertsModel,
    getFraudAlertByIdModel,
    updateFraudAlertStatusModel
} from '../../models/fraudModel.js';

export const getAllFraudAlertsService =
async () => {

    const alerts =
        await getAllFraudAlertsModel();

    return alerts;
};

export const resolveFraudAlertService =
async (alertId) => {

    const alert =
        await getFraudAlertByIdModel(alertId);

    if (!alert) {
        throw new Error("Fraud alert not found");
    }

    if (alert.status === "resolved") {
        throw new Error(
            "Fraud alert already resolved"
        );
    }
    const updatedAlert =
        await updateFraudAlertStatusModel(
            alertId,
            "resolved"
        );

    return updatedAlert;
};