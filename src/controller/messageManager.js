const Messages = require('../dao/db/models/message.model')

class MessageManager{
    
    async addMessage(msj){
        try{
            await Messages.create(msj)
            return true;
        }catch(error){
            console.log(error)
            return error
        }
    }

    async getMessages(){
        try{
            const messages = await Messages.find().lean()
            if(messages != null){
                return messages
            }
        }catch(error){
            console.log(error)
            return error
        }
    }
}

module.exports = MessageManager