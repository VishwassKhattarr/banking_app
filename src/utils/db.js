import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Pool}=pg;

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl: { rejectUnauthorized:false}
});

const query=async(text,params) => {
    const result=await pool.query(text,params);
    return result;
};

export {query};