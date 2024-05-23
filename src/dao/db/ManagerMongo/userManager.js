const Users = require('../models/user.model')

class UserManager{
    async addUser(user){
        try{
            await Users.create(user)
            return true;
        }catch(error){
            console.log(error)
            return error
        }
    }

    async existsUser(email){
        try{
            const userFound = await Users.findOne({email})
            return userFound
        }catch(error){
            console.log(error)
            return error
        }
    }

    async updateUser(userId, newUser){
        try{
            await Users.updateOne({_id: userId}, {$set: newUser})
            return true
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = UserManager