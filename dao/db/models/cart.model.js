const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    }
})

const Carts = mongoose.model('Cart', CartSchema)

module.exports = Carts