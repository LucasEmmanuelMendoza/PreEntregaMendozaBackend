const mongoose = require('mongoose')
const mongoPaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    },
    code: {
        type:Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type:Number,
        required: true
    },
    status: {
        type: Boolean,
    },
    owner: {
        type: String,
        default: 'admin'
    }
})

ProductSchema.plugin(mongoPaginate)

const ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel