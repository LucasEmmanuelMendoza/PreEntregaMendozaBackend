const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            }
        ]
    }
})

CartSchema.pre('findOne', () => {
    this.populate('products.product')
})

const Carts = mongoose.model('Cart', CartSchema)

module.exports = Carts