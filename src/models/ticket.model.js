const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    code:{
        type:String,
        required: true,
        unique: true
    },
    purchase_dateTime: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
})

const TicketModel = mongoose.model('ticket', TicketSchema)

module.exports = TicketModel