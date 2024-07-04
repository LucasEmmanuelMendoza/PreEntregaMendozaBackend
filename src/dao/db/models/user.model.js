const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        unique: true
    },
    age:{
        type:Number
    },
    password:{
        type:String
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    role:{
        type:String,
        default:'user'
    },
    documents:{
        type: [DocumentSchema],
        default: []
    },
    last_connection:{
        type: Date
    }},    
    {
        timestamps:true,
        strict:false//agregar datos adicionales al create
    }
)

const Users = mongoose.model('users', UserSchema)

module.exports = Users