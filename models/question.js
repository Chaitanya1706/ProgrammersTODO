const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        default: 'UNSOLVED'
    },
    lastsolved: {
        type: Date,
        default: null
    },
    description: {
        type: String
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// questSchema.index({ name: 'text', topic: 'text' });


const Question = mongoose.model('Question', questSchema);

module.exports = Question;