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


module.exports

