const express = require('express');
// const createEntry = require('../index2');
const bodyParser = require('body-parser');
const apiRouter = express.Router();
const dns = require('node:dns');


require('dotenv').config();
console.log(process.env.MONGO_URI);

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {useUnifiedTopology: true})
    .then(()=> console.log('connected')).catch((err)=> console.log(err));

const urlSchema = mongoose.Schema({
        original_url: String,
        short_url: String
    })

const Url = mongoose.model('Url', urlSchema);


function createEntry(original_url, short_url, done){
    Url.create({
        original_url:original_url,
        short_url:short_url
    }, function (err, data){
            done(null, data);
    })
}


apiRouter.use(bodyParser.json());


apiRouter.get('/', (req, res)=>{
    res.send('hello from api routes')
})

apiRouter.post('/shorturl', (req, res)=>{
    const original_url = req.body.url;

    // dns lookup to verify url integrity
    let urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/);

    if (!original_url.match(urlRegex)) {
        return res.json({ error: "Invalid URL" });
    }


    // Check if url already exists
    Url.find({
        original_url: original_url
    }).then(function(doc){
        console.log(doc);
    })


    // Url.create({
    //     original_url: original_url,
    //     short_url: 4
    // }).then(function(doc){
    //     console.log(doc);
    // })

    

    
})

module.exports = apiRouter;