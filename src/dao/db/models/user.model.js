const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})

const Users = mongoose.model('users', UserSchema)

module.exports = Users