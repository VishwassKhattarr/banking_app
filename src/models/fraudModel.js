import {query} from '../utils/db.js'

export const createFraudAlertModel=async(
    userId,
    transactionId,
    riskScore,
    reason
)=>{
    const sql = `
        INSERT INTO fraud_alerts (
            user_id,
            transaction_id,
            risk_score,
            reason
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [
        userId,
        transactionId,
        riskScore,
        reason
    ];

    const result = await query(sql, values);

    return result.rows[0];
};

export const getAllFraudAlertsModel = async () => {

    const sql = `
        SELECT
            id,
            user_id,
            transaction_id,
            risk_score,
            reason,
            status,
            created_at
        FROM fraud_alerts
        ORDER BY created_at DESC
    `;

    const result = await query(sql);

    return result.rows;
};

export const getRecentTransactionModel=async(userId)=>{
    const sql=`SELECT id, sender_id, amount, created_at
    FROM transactions
    WHERE sender_id=$1
    AND created_at>=NOW-INTERVAL '1 minute'
    ORDER BY created_at DESC
    `;

    const values=[userId];
    const result=await query(sql,values);
    return result.rows;
};

export const getFraudAlertByIdModel =
async (alertId) => {

    const sql = `
        SELECT
            id,
            user_id,
            transaction_id,
            risk_score,
            reason,
            status,
            created_at
        FROM fraud_alerts
        WHERE id = $1
    `;

    const values = [alertId];

    const result =
        await query(sql, values);

    return result.rows[0];
};

export const updateFraudAlertStatusModel =
async (
    alertId,
    status
) => {

    const sql = `
        UPDATE fraud_alerts
        SET status = $1
        WHERE id = $2
        RETURNING *
    `;

    const values = [
        status,
        alertId
    ];

    const result =
        await query(sql, values);

    return result.rows[0];
};

export const getRecentTransferTransactionsModel =
async () => {

    const sql = `
        SELECT
            sender_id,
            receiver_id
        FROM transactions
        WHERE type = 'transfer'
        AND created_at >= NOW() - INTERVAL '1 day'
    `;

    const result = await query(sql);

    return result.rows;
};

