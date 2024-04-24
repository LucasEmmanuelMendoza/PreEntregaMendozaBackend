const TicketModel = require('../models/ticket.model.js')

class TicketManager{
    async addTicket(ticket){
        await TicketModel.create(ticket) 
    }catch(error){
        console.log(error) 
        return error
    }
}

module.exports = TicketManager