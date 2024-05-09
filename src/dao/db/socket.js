const MessageManager = require('../../controller/messageManager.js')
const CartManager = require('../db/ManagerMongo/cartManager.js')
//const CartManager = require('../fileSystem/cartManager.js')
const TicketManager = require('../../dao/db/ManagerMongo/ticketManager.js')
const { v4: uuidv4  } = require('uuid');
const ProductManager = require('./ManagerMongo/productManager.js');
const { EErrors } = require('../../services/errors/errors-enum.js');
const { purchaseCartErrorInfoSP } = require('../../services/errors/messages/purchase-cart-error.message.js')
const { CustomError } = require('../../services/errors/CustomError.js')
//const ProductManger = require('../fileSystem/productManager.js')

const productManager = new ProductManager()
const message = new MessageManager()
const cartManager = new CartManager()
const ticketManager = new TicketManager()

let productos = [];
(async() => {
    productos = await productManager.getProducts()
})();

let messages = [];
(async() => {
  messages = await message.getMessages()
})();  

const funcionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected');

  socket.on('addProd', (data) => {
    (async() => {  
      await productManager.addProduct(data);
      productos = await productManager.getProducts()
      productos.payload.push(data);
    })();
    socket.emit('productosServidor', productos.payload);
  })

  socket.on('deleteProd', (data) => {
    productos = productos.filter((prod) => prod._id != data);
    (async() => {
      await productManager.deleteProduct(data);
    })();
    socket.emit('productosServidor', productos);
  }) 

  socket.on('newMsg', (data) => {
    messages.push(data);
    (async() => {
      await message.addMessage(data);
    })();
      io.sockets.emit('messagesServidor', messages);
    })

  socket.on('prodToCart', (cart) => { 
      (async () => {
        await cartManager.addProduct(cart.cartId, cart.prod)
        console.log(`Producto ${cart.prod} agregado al carro`)
      })();
    })

  socket.on('addTicket', async(ticket) => {
      try{          
          const code = uuidv4(); 
          const cart = await cartManager.getCartById(ticket.cartId);
          const products = await productManager.getProducts();
  
          let newAmount = 0
          const cartPurchase = []
        
          //arreglar que se descuenten si el ticket llega con todos los datos verificados abajo
          for(prodCart of cart.products){
            for(prod of products){
                if((prodCart.product._id.toString() === prod._id.toString()) && (prodCart.quantity <= prod.stock)){
                prod.stock -= prodCart.quantity;
                await productManager.updateProduct(prod._id, prod)
                cartPurchase.push(prodCart);
                newAmount += prodCart.quantity * prodCart.product.price
                await cartManager.deleteProduct(cart._id, prodCart.product._id)
              }
            }
          };
  
          const newTicket = {
            code,
            purchase_dateTime: ticket.purchase_dateTime,
            amount: newAmount,
            purchaser: ticket.purchaser,
          }
                      
          console.log('newTicket.purchaser:',newTicket.purchaser)
          console.log('newTicket.purchaser.trim(): ', newTicket.purchaser.trim())

          if (!newTicket.purchaser || newTicket.purchaser.trim() === '' || newTicket.purchaser === '') {
            console.log('estoy acá')
            throw CustomError.createError({
              name: 'Invalid Ticket Data',
              cause: purchaseCartErrorInfoSP({newTicket}),
              message: 'Purchaser field cannot be empty',
              code: EErrors.INVALID_TYPES_ERROR
            });
          }
  
        if(newTicket.amount > 0){
          const addTicket = await ticketManager.addTicket(newTicket)
          
          if(addTicket){
            console.log('Ticket de compra generado con éxito')
            alert('Ticket Agregado')
          }
          }else{
            console.log('No hay productos en stock para el carrito seleccionado')
          }
      }catch(error){
        console.log('Error:', error) 
      }
    });//fin socket addTicket

  });
};

module.exports = funcionSocket;
