require('dotenv').config();
const express = require('express');
const apiRouter = require('./api/routes');
const app = express();
const cors = require('cors')

const port = process.env.PORT;

app.use(cors());
app.use('/', apiRouter);

app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
});