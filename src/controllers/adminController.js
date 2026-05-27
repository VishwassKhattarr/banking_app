import {
    getAllUsersService,
    getAllTransactionsService,
    getUserByIdService,
    blockUserService,
    unblockUserService,
    getAdminStatsService,
    getHighValueTransactionsService
} from '../services/adminServices.js';

export const getAllUsers = async(req, res)=>{
    try{
        const users=await getAllUsersService();

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getAllTransactions = async(req,res)=>{
    try{
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const transactions= await getAllTransactionsService(page,limit);

        res.status(200).json({
            success:true,
            page,
            limit,
            count: transactions.length,
            transactions
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

export const getUserById=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await getUserById(id);

        res.status(200).json({
            success:true,
            user
        })
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
};

export const blockUser=async(req,res)=>{
    try{
    const {id}=req.params;

    const updatedUser=await blockUserService(id);
    res.status(200).json({
        sucess:true,
        message:"user blocked successfully",
        user:updatedUser
    });
}catch(error){
    res.status(500).json({
        sucess:false,
        message:error.message
    })
}
};

export const unblockUser = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedUser = await unblockUserService(id);

        res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getAdminStats = async(req,res)=>{
    try{
        const stats=await getAdminStatsService();
        res.status(200).json({
            success:true,
            stats
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getHighValueTransactions = async (req, res) => {
    try {

        const transactions =
            await getHighValueTransactionsService();

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

