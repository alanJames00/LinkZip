const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env'});



// MongoDB Atlas setup
const uri = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(console.log('connected to atlas'));

// export the authenticated mongoose client
module.exports = mongoose;