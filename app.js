const carts = require('./routesDb/cart.routes.js')
const routerCarts = carts.routerCarts;

const prods = require('./routesDb/product.routes.js')
const routerProduct = prods.routerProduct;

//const views =  require('./dao/fileSystem/routes/views.routes.js');
const views = require('./routesDb/views.routes.js')
//const views = require('./dao/fileSystem/routes/views.routes.js')
const routerView = views.routerViews;

const Database = require('./dao/db/index.js')

const { Server } = require("socket.io");
const http = require('http')
const express = require("express");
const PORT = 8080
const app = express();
const server = http.createServer(app)
const handlebars = require('express-handlebars');

const ProductManager = require('./dao/db/productManagerMongo/productManager.js')
const product = new ProductManager()

const MessageManager = require('./dao/db/productManagerMongo/messageManager.js')
const message = new MessageManager()

let productos = [];
(async() => {
  productos = await product.getProducts()
})();

let messages = [];
(async() => {
  messages = await message.getMessages()
})();

//Public
app.use(express.static(__dirname+'/public'))
app.set('views', __dirname+'/views')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//Routes
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)
app.use('/views', routerView)

//Socket
const io = new Server(server)
io.on('connection', (socket) => {
  console.log('User conectado')

  socket.on('addProd', (data1) => {
    (async() => {
      await product.addProduct(data1)
    })();
    
    socket.emit('productosServidor', productos) 
  })

  socket.on('deleteProd', (data) => {
    //data: id del producto a eliminar
    productos = productos.filter((prod) => prod._id != data);
    (async() => {
      await product.deleteProduct(data)
    })();
    socket.emit('productosServidor', productos) 
  }) 

  socket.on('newMsg', (data) => {
    (async() => {
      await message.addMessage(data)
    })();

    io.sockets.emit('messagesServidor', messages)

  })
})

server.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
  Database.connect()  
})