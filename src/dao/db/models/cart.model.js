const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                }
            }
        ]
    }
})

CartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const Carts = mongoose.model('Cart', CartSchema)

module.exports = Carts