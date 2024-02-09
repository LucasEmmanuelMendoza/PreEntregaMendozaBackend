const carts = require('./dao/fileSystem/routes/cart.routes.js')
const routerCarts = carts.routerCarts;
const prods = require('./dao/fileSystem/routes/products.routes.js');
const routerProduct = prods.routerProduct;
const views =  require('./dao/fileSystem/routes/views.routes.js');
const routerView = views.routerViews;

const { Server } = require("socket.io");
const http = require('http')
const express = require("express");
const PORT = 8080
const app = express();
const server = http.createServer(app)
const handlebars = require('express-handlebars');
/* 
const ProductManager = require('./src/productManager.js') */
const ProductManager = require('./dao/fileSystem/productManager.js')
const product = new ProductManager()

let productos = [];
(async() => {
  productos = await product.getProducts()
})();

//Public
app.use(express.static(__dirname+'/public'))
app.set('views', __dirname+'/views')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
/* app.set('views', '/views') */

//Routes
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)
app.use('/views', routerView)

//Socket
const io = new Server(server)
io.on('connection', (socket) => {
  console.log('User conectado')

  socket.on('addProd', (data1) => {
    //de data1 no viene id

    (async() => {
      await product.addProduct(data1.title, data1.description, data1.price, data1.thumbnail, data1.code, data1.stock, data1.category)
    })();

    (async() => {
      productos = await product.getProducts()
    })();
    
    socket.emit('productosServidor', productos) 
  })

  socket.on('deleteProd', (data) => {
    productos = productos.filter((prod) => prod.id != data);
    (async() => {
      const retorno = await product.deleteProduct(data)
    })();
    socket.emit('productosServidor', productos) 
  }) 
})

server.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
})