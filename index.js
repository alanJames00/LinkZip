require('dotenv').config();
const express = require('express');
const apiRouter = require('./api/routes');
const app = express();

const port = 3000;

app.use('/api', apiRouter);

app.get('/',(req, res)=>{
    res.send('Hello, this is TinyTim')
})




app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
});