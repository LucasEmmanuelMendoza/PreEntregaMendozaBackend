const Users = require('../dao/db/models/user.model')

class UserManager{
    async updatePassword(email, newPassword){
        try{
            const foundUser = await Users.findOne({email})
            if(foundUser != null){
                await Users.updateOne({"email": email}, {$set: {"password": newPassword}})
                return true
            }
        }catch(error){
            console.log(error)
            return error
        }
    }

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
}

module.exports = UserManager