import { verifyToken } from '../utils/jwt.js';

const authMiddleware=(req,res,next) => {
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'No token provided'});
        }

        const token=authHeader.split(' ')[1];
        const decoded=verifyToken(token);
        req.user=decoded;
        next();

    }catch(error){
        res.status(401).json({message: 'Invalid or expired token'});
    }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

export { authMiddleware, adminMiddleware };