import { createFraudAlertModel, getRecentTransactionModel } from "../../models/fraudModel";

export const detectRapidTransactions =
async (
    userId,
    transactionId
) => {

    const recentTransactions =
        await getRecentTransactionsModel(userId);

    if (recentTransactions.length >= 5) {

        await createFraudAlertModel(
            userId,
            transactionId,
            40,
            "Rapid transactions detected"
        );
    }
};