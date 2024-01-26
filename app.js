const carts = require('./routes/cart.routes.js');
const routerCarts = carts.routerCarts;
const prods = require('./routes/products.routes.js');
const routerProduct = prods.routerProduct;
const views =  require('./routes/views.routes.js');
const routerView = views.routerViews;

const { Server } = require("socket.io");
const http = require('http')
const express = require("express");
const PORT = 8080
const app = express();
const server = http.createServer(app)
const handlebars = require('express-handlebars');

const productos = []

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

  //msjProd=socket.emit(msjProd) de addNewProd - public/js/index.js
  socket.on('msjProd', (data) => {
    productos.push(data)
    socket.emit('productosServidor', productos)
  })
})

server.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
})