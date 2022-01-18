const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    education : {
        type : String
    },
    questions : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        } 
    ],
    solved : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        } 
    ],
    unsolved : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        } 
    ],
    retry : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        } 
    ]

},
{
    timestamps : true
})

const User = mongoose.model('User',userSchema);

module.exports = User;