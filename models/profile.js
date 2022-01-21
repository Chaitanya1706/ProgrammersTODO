const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
    },
    img: {
        filename: String,
        filepath: String
    },
    education: {
        type: String
    },
    website: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;