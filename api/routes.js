const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');


// MongoDB Atlas setup
const uri = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(console.log('connected to atlas'));


const urlSchema = mongoose.Schema({
    original_url: String,
    short_url: String
})

const Url = mongoose.model('Url', urlSchema);



apiRouter.use(bodyParser.json()); // Depends on the type of encoding used

apiRouter.post('/shorten', (req, res) => {

    const bodyUrl = req.body.url;

    // Check for valid url string with RegeX
    let urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/);

    if (!bodyUrl.match(urlRegex)) {
        return res.json({ error: "Invalid URL" });
    }

    // Handle th db update

    // Get max count from db
    Url.findOne({ short_url: 'maxCount' }).then((doc) => {
        let max_c = parseInt(doc.original_url);
        console.log(typeof (max_c));
        // Check if url already in db

        Url.find({ original_url: bodyUrl }).then((doc1) => {

            if (doc1.length == 0) {
                // url not found in db therefore create.
                max_c = max_c + 1;
                Url.create({
                    original_url: bodyUrl,
                    short_url: max_c.toString()
                }).then((doc2) => {

                    // Update maxCount
                    Url.findOneAndUpdate({ short_url: 'maxCount' }, { original_url: max_c.toString() })
                        .then((doc4) => {
                            res.json({
                                original_url: doc2.original_url,
                                short_url: doc2.short_url
                            })
                        })
                });
            }

            else {
                // url already in db therefor respond with it

                res.json({
                    original_url: doc1[0].original_url,
                    short_url: doc1[0].short_url
                });
            }
        })
    })
})

apiRouter.get('/:url', (req, res) => {

    const reqUrl = req.params.url;
    Url.find({short_url:reqUrl}).then((doc)=>{
        // handle not found
        if(doc.length == 0){
            res.json(
                {error:"No short URL found for the given input"}
            )
        }
        else{
            res.redirect(doc[0].original_url);
        }
        // handle found
    })
})

apiRouter.get('/', (req, res) => {
    res.send('Hi, This is LinkZip');
})

// Module Exports
module.exports = apiRouter;

