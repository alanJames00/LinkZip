require('dotenv').config();
const express = require('express');
const apiRouter = require('./api/routes');
const app = express();

const port = process.env.PORT;

app.use('/', apiRouter);

app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
});