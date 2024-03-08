const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    password:{
        type:String
    }
})

const Users = mongoose.model('users', UserSchema)

module.exports = Users