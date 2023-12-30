const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/authenticate', async (req, res) => {

    res.json({
        message: 'Auth success',
    });
}); 




module.exports = userRouter;