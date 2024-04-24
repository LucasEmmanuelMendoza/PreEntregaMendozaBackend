const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    }
})

CartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel