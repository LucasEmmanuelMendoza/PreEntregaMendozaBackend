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

    async existsUser(username){
        try{
            const userFound = await Users.findOne({username: username})
            return userFound !== null;
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = UserManager