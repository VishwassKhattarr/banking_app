import { query } from "../utils/db.js";



const createAccount =
async (userId) => {

    const result = await query(

        `

        INSERT INTO accounts
        (
            user_id,
            balance
        )

        VALUES ($1, $2)

        RETURNING *

        `,

        [userId, 0]
    );

    return result.rows[0];
};



const getAccountByUserId =
async (userId) => {

    const result = await query(

        `

        SELECT *

        FROM accounts

        WHERE user_id = $1

        `,

        [userId]
    );

    return result.rows[0];
};



const getAccountById =
async (accountId) => {

    const result = await query(

        `

        SELECT *

        FROM accounts

        WHERE id = $1

        `,

        [accountId]
    );

    return result.rows[0];
};



const updateBalance =
async (
    accountId,
    newBalance
) => {

    const result = await query(

        `

        UPDATE accounts

        SET balance = $1

        WHERE id = $2

        RETURNING *

        `,

        [newBalance, accountId]
    );

    return result.rows[0];
};



export {
    createAccount,
    getAccountByUserId,
    getAccountById,
    updateBalance
};