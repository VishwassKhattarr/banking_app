import { query } from '../utils/db.js'
export const getAllUsersModel = async()=>{
    const sql= `SELECT id, name, email, balance, role, is_blocked, created_at
    FROM users
    ORDER BY created_at DESC
    `;

    const result = await query(sql);
    return result.rows;

};



export const getAllTrnsactionModel = async(page, limit)=>{
    const sql=`SELECT id,sender_id,reciever_id,amount,type,status,created_at
    FROM transactions
    ORDER BY created_at DESC
    LIMIT $1
    OFFSET $2`
    ;
    const values=[limit,offset];

    const result=await query(sql,values);
    return result.rows;
};

export const getUserByIdModel = async(id) => {
    const sql= `SELECT id, name, email, balance, role, is_blocked, created_at
    FROM users
    where id=$1 `;
    const values=[id];
    const result=await query(sql,values);
    return result.rows[0];
};

export const updateUserBlockStatusModel=async(id, blockStatus) => {
    const sql=`
    UPDATE users
    SET is_blocked=$1
    where id=$2
    RETURNING
    id, name, email, balance, role, is_blocked, created_at`;
    
    const values=[blockStatus,id];
    const result=await query(sql,values);
    return result.rows[0];
};


export const getAdminStatsModel = async () => {

    const totalUsersQuery = `
        SELECT COUNT(*) FROM users
    `;

    const totalTransactionsQuery = `
        SELECT COUNT(*) FROM transactions
    `;

    const totalVolumeQuery = `
        SELECT COALESCE(SUM(amount), 0)
        FROM transactions
    `;

    const totalUsersResult =
        await query(totalUsersQuery);

    const totalTransactionsResult =
        await query(totalTransactionsQuery);

    const totalVolumeResult =
        await query(totalVolumeQuery);

    return {
        totalUsers:
            parseInt(
                totalUsersResult.rows[0].count
            ),

        totalTransactions:
            parseInt(
                totalTransactionsResult.rows[0].count
            ),

        totalTransactionVolume:
            parseFloat(
                totalVolumeResult.rows[0].coalesce
            )
    };
};


export const getHighValueTransactionsModel =
async () => {

    const sql = `
        SELECT
            id,
            sender_id,
            receiver_id,
            amount,
            type,
            status,
            created_at
        FROM transactions
        WHERE amount > 50000
        ORDER BY amount DESC
    `;

    const result = await query(sql);

    return result.rows;
};