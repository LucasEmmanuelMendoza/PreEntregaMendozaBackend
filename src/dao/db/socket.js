const ProductService = require('../../services/productService.js')
const MessageManager = require('../../controller/messageManager.js')
const CartManager = require('../../services/cartService.js')
const TicketManager = require('../../dao/db/ManagerMongo/ticketManager.js')
const { v4: uuidv4  } = require('uuid');

const product = new ProductService()
const message = new MessageManager()
const cartManager = new CartManager()
const ticketManager = new TicketManager()

let productos = [];
(async() => {
    productos = await product.findProducts()
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
      await product.addProd(data);
      productos = await product.findProducts()
      productos.payload.push(data);
    })();
    socket.emit('productosServidor', productos.payload);
  })

  socket.on('deleteProd', (data) => {
    productos = productos.filter((prod) => prod._id != data);
    (async() => {
      await product.deleteProd(data);
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
        await cartManager.addProductToCart(cart.cartId, cart.prod)
        console.log(`Producto ${cart.prod} agregado al carro`)
      })();
    })

    socket.on('addTicket', (ticket) => {
      (async () => {
        //const code = uuidv4()
        const code = 10
        const newTicket = {
          ...ticket,
          code
        }
        await ticketManager.addTicket(newTicket)
        console.log('Ticket generado')
      }) 
    })

  });


};

module.exports = funcionSocket;
