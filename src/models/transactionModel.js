import { query } from '../utils/db.js';



const createTransaction =
async ({
    senderAccountId,
    receiverAccountId,
    amount,
    type,
    status
}) => {

    const sql = `

        INSERT INTO transactions
        (
            sender_id,
            receiver_id,
            amount,
            type,
            status
        )

        VALUES ($1, $2, $3, $4, $5)

        RETURNING *

    `;

    const values = [
        senderAccountId,
        receiverAccountId,
        amount,
        type,
        status
    ];

    const result =
        await query(sql, values);

    return result.rows[0];
};



const getTransactionByAccountId =
async (accountId) => {

    const sql = `

        SELECT *

        FROM transactions

        WHERE
            sender_id = $1
            OR
            receiver_id = $1

        ORDER BY created_at DESC

    `;

    const result =
        await query(sql, [accountId]);

    return result.rows;
};



export {
    createTransaction,
    getTransactionByAccountId
};