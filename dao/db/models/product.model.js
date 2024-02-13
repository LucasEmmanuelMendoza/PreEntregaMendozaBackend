const mongoose = require('mongoose')

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
})

const Products = mongoose.model('Products', ProductSchema)

module.exports = Products