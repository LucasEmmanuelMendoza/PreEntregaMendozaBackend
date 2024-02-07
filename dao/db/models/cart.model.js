const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    id: {
        type:String,
        required: true
    },
    products: {
        type:[],
        required: true
    }
})

const Cart = mongoose.model('Product', CartSchema)

module.exports = Cart