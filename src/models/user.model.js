const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {first_name:{
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
    }},    
    {
        timestamps:true,
        strict:false//agregar datos adicionales al create
    }
)

const Users = mongoose.model('users', UserSchema)

module.exports = Users