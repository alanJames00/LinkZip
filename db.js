require('dotenv').config();
console.log(process.env.MONGO_URI);

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(console.log('connected'));

const urlSchema = mongoose.Schema({
    original_url: String,
    short_url: String
})

const Url = mongoose.model('Url', urlSchema);

Url.create({
    original_url: "1",
    short_url:'maxCount'
}).then((doc)=>console.log(doc))
