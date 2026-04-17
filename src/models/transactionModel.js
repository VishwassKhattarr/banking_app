import { query } from '../utils/db.js';

const createTransaction = async ({
  senderAccountId,
  receiverAccountId,
  amount,
  type,
  status
}) => {
  const queryString = `
    INSERT INTO transactions 
    (sender_id, receiver_id, amount, type, status, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *;
  `;

  const values = [
    senderAccountId || null,
    receiverAccountId || null,
    amount,
    type,
    status
  ];

  const result = await query(queryString, values);
  return result.rows[0];
};

const getTransactionByAccountId=async(accountId)=>{
    const queryString= `SELECT * FROM transactions
    WHERE sender_id=$1 OR receiver_id=$1
    ORDER BY created_at DESC;
    `;

    const result=await query(queryString, [accountId]);
    return result.rows;
};

export { createTransaction, getTransactionByAccountId };