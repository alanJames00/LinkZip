const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res)=>{
    res.send('hello from api routes')
})


module.exports = apiRouter;