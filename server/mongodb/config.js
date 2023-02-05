const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UniConnect'
   
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});
module.exports = { mongoose }  // Export the active connection.