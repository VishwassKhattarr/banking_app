import {query} from '../utils/db.js';

const createAccount=async(userId)=>{
    const result=await query(
        'INSERT INTO accounts (user_id) VALUES ($1) RETURNING *',
        [userId]
    );
    return result.rows[0];
};

const getAccountByUserId = async (userId) => {

  const result = await query(
    'SELECT * FROM accounts WHERE user_id = $1',
    [userId]
  );
  
  return result.rows[0];
};


const getAccountById = async (accountId) => {
  const result = await query(
    'SELECT * FROM accounts WHERE id = $1',
    [accountId]
  );
  return result.rows[0];
};

export {createAccount,getAccountByUserId,getAccountById};
