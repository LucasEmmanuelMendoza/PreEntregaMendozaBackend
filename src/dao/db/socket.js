const ProductService = require('../../services/productService.js')
const MessageManager = require('../../controller/messageManager.js')
const CartManager = require('../../services/cartService.js')

const product = new ProductService()
const message = new MessageManager()
const cart = new CartManager()

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

    console.log(productos.payload)

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

  socket.on('prodToCart', (data) => {
      (async() => {
          await cart.addProd(data.cartId, data.prod)
      })();
    })
  });
};

module.exports = funcionSocket;
