import {query} from '../utils/db.js';

const createUser=async( name,email, hashedPassword) => {
    const result=await query(
        'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
        [name,email,hashedPassword]
    );
    return result.rows[0];    
};

const findUserByEmail=async(email)=>{
    const result=await query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
    return result.rows[0];
};

const findUserById=async(id)=>{
    const result=await query(
        'SELECT * FROM users WHERE id= $1',
        [id]
    );
    return result.rows[0];
};

export {createUser,findUserById,findUserByEmail};
