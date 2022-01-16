const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    topic : {
        type : String,
    },
    deadline : {
        type : String
    },
    status :{
        type : String
    },
    description :{
        type : String
    }
},{
    timestamps : true
})

const Question = mongoose.model('Question',questSchema);

module.exports = Question;