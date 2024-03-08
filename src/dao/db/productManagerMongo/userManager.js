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
            if(userFound != null){
                return userFound
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = UserManager