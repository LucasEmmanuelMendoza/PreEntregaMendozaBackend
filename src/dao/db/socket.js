const MessageManager = require('../../controller/messageManager.js')
const CartManager = require('../db/ManagerMongo/cartManager.js')
//const CartManager = require('../fileSystem/cartManager.js')
const TicketManager = require('../../dao/db/ManagerMongo/ticketManager.js')
const { v4: uuidv4  } = require('uuid');
const ProductManager = require('./ManagerMongo/productManager.js');
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

    socket.on('addTicket', (ticket) => {
      (async () => {
        const code = uuidv4(); 
        const cart = await cartManager.getCartById(ticket.cartId);
        const products = await productManager.getProducts();

        let newAmount = 0
        const cartPurchase = []

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
                    
        if(newTicket.amount > 0){
          const addTicket = await ticketManager.addTicket(newTicket)
  
          if(addTicket){
            console.log('Ticket de compra generado con éxito')
          }
        }else{
          console.log('No hay productos en stock para el carrito seleccionado')
        }
      })(); 
    })

  });
};

module.exports = funcionSocket;
