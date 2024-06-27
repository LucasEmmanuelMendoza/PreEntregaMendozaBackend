const Users = require('../dao/db/models/user.model');
const UserDTO = require('../services/dto/userDTO');

class UserManager{
    async deleteOneUser(userId){
        try{
            const deleteReturn = await Users.deleteOne({"_id": userId})
            if(deleteReturn){
                return true
            }
        }catch(error){
            console.log(error)
            return error
        }
    }

    async getAllUsers(){
        try{
            const foundUsers = await Users.find();
            if(foundUsers){
                return foundUsers.map(user => new UserDTO(user))
            }
        }catch(error){
            console.log(error)
            return error
        }
    }

    async updateUser(userId, value){
        try{
            const foundUser = await Users.findOne({ _id: userId })
            if(foundUser != null){
                await Users.updateOne({"_id": userId}, {$set: value})
                return true
            }
        }catch(error){
            console.log(error)
            return error
        }
    }

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

    async getUserById(id){
        try{
            const userFound = await Users.findOne({ _id: id })
            return userFound
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = UserManager