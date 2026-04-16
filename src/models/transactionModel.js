import db from '../utils/db.js';

const createTransaction = async ({
  senderAccountId,
  receiverAccountId,
  amount,
  type,
  status
}) => {
  const query = `
    INSERT INTO transactions 
    (sender_id_account_id, receiver_id_account_id, amount, type, status, created_at)
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

  const result = await db.query(query, values);
  return result.rows[0];
};

export {createTransaction};