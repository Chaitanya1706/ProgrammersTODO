const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Chats:wkTnlxjfJG9dmxTP@cluster0.mxmxr.mongodb.net/ProgrammersTODO?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error in connecting to DB",));

db.once('open',function(){
    console.log("Connected to DB::MongoDB");
})

module.exports = db;
