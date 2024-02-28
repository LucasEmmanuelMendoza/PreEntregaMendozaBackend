const ProductManager = require('./productManagerMongo/productManager.js')
const MessageManager = require('./productManagerMongo/messageManager.js')
const CartManager = require('./productManagerMongo/cartManager.js')

const product = new ProductManager()
const message = new MessageManager()
const cart = new CartManager()

let productos = [];
(async() => {
    productos = await product.getProducts()
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
      await product.addProduct(data);
      productos = await product.getProducts()
      productos.payload.push(data);
    })();

    console.log(productos.payload)

    socket.emit('productosServidor', productos.payload);
  })

  socket.on('deleteProd', (data) => {
    productos = productos.filter((prod) => prod._id != data);
    (async() => {
      await product.deleteProduct(data);
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
          await cart.addProduct(data.cartId, data.prod)
      })();
    })
  });
};

module.exports = funcionSocket;
