const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    bio : {
        type : String,
    },
    photo : {
        type : Buffer
    },
    website : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;