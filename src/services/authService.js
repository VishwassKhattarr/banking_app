import { createUser, findUserByEmail } from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashed=await hashPassword(password);
  const user=await createUser(name,email,hashed);

  return {message: 'User registered successfully', userId:user.id};
};

const loginUser=async(email,password)=>{
    const user=await findUserByEmail(email);
    if(!user){
        throw new Error('Invalid emial or password');
    }

    const token=generateToken({id:user.id,role:user.role});
    return {token, role: user.role, name:user.name};
};

export {registerUser,loginUser}