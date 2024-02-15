const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },

    message:{
        type: String,
        required: true
    }
})

const Messages = mongoose.model('messages', MessageSchema)

module.exports = Messages