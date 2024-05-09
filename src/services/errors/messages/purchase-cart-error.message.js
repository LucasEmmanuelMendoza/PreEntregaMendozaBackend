const purchaseCartErrorInfoSP = (ticket) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas
    Lista de propiedades requeridas:
        -> cartId: type String, recibido: ${ticket.cartId}
        -> purchase_dateTime: type String, recibido: ${ticket.purchase_dateTime}
        -> amount: type String, recibido: ${ticket.amount}
        -> purchaser: type String, recibido: ${ticket.purchaser}`;
}

const purchaseCartErrorInfoENG = (ticket) => {
    return `One or more properties were sent incomplete or are not valid.
    List of required properties:
    -> cartId: type String, received: ${ticket.cartId}
    -> purchase_dateTime: type String, received: ${ticket.purchase_dateTime}
    -> amount: type String, received: ${ticket.amount}
    -> purchaser: type String, received: ${ticket.purchaser}`;
}

module.exports = { purchaseCartErrorInfoSP, purchaseCartErrorInfoENG }