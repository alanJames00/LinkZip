const mongoose = require("./dbConnector");

const urlSchema = mongoose.Schema({

    original_url: String,
    short_url: String,
    userBelongs: Boolean,
})

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;