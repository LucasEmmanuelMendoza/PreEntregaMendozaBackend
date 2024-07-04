const TicketModel = require('../models/ticket.model.js')

class TicketManager{
    async addTicket(ticket){
        const retorno = await TicketModel.create(ticket)
        if(retorno){
            return true
        }
    }catch(error){
        console.log('Error') 
        return error
    }
}

module.exports = TicketManager