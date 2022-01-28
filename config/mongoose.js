const mongoose = require('mongoose');

mongoose.connect(process.env.mogourl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to DB",));

db.once('open', function () {
    console.log("Connected to DB::MongoDB");
})

module.exports = db;
