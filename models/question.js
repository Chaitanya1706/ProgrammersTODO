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
    category : {
        type : String,
        required : true
    },
    deadline : {
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