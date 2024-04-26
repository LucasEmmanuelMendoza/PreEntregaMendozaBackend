const TicketModel = require('../models/ticket.model.js')

class TicketManager{
    async addTicket(ticket){
        await TicketModel.create(ticket) 
        console.log('Ticket agregado manager')
    }catch(error){
        console.log('Error') 
        return error
    }
}

module.exports = TicketManager