const { io } = require('../../app.js')
const ProductManager = require('./productManagerMongo/productManager.js')
const MessageManager = require('./productManagerMongo/messageManager.js')

const product = new ProductManager()
const message = new MessageManager()

let productos = []
(async() => {
    productos = await product.getProducts()
})();

let messages = [];
(async() => {
  messages = await message.getMessages()
})(); 

io.on('Connection', (socket) => {

    socket.on('addProd', (data) => {
      productos.push(data)
        (async() => {  
            productos = await product.addProduct(data)
        })();
        socket.emit('productosServidor', productos)
    })

    socket.on('deleteProd', (data) => {
        //data: id del producto a eliminar
        console.log(data)
        productos = productos.filter((prod) => prod._id != data);
        (async() => {
          await product.deleteProduct(data)
        })();
        socket.emit('productosServidor', productos) 
      }) 

    socket.on('newMsg', (data) => {
    messages.push(data)
    (async() => {
        await message.addMessage(data)
    })();

    io.sockets.emit('messagesServidor', messages)
    })
})
