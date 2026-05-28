import {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory
} from '../services/transactionService.js';



const depositController =
async (req, res) => {

    try {

        const { amount } = req.body;

        const result =
            await deposit(
                req.user.id,
                amount
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({

            message: error.message
        });
    }
};



const withdrawController =
async (req, res) => {

    try {

        const { amount } = req.body;

        const result =
            await withdraw(
                req.user.id,
                amount
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({

            message: error.message
        });
    }
};



const transferController =
async (req, res) => {

    try {

        const {
            toUserId,
            amount
        } = req.body;

        const result =
            await transfer(
                req.user.id,
                toUserId,
                amount
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({

            message: error.message
        });
    }
};



const getTransactionHistoryController =
async (req, res) => {

    try {

        const transactions =
            await getTransactionHistory(
                req.user.id
            );

        res.status(200).json({

            transactions
        });

    } catch (error) {

        res.status(400).json({

            message: error.message
        });
    }
};



export {
    depositController,
    withdrawController,
    transferController,
    getTransactionHistoryController
};