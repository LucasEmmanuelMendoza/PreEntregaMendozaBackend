/* const cartsR = require('./routesDb/cart.routes.js') */
const cartsR = require('./dao/db/routesDb/cart.routes.js')
const routerCarts = cartsR.routerCarts;

const prods = require('./dao/db/routesDb/product.routes.js')
const routerProduct = prods.routerProduct;

const views = require('./dao/db/routesDb/views.routes.js')
const routerView = views.routerViews;

const Database = require('./dao/db/index.js')

const { Server } = require("socket.io");
const http = require('http')
const express = require("express");
const PORT = 8080
const app = express();
const server = http.createServer(app)
const handlebars = require('express-handlebars');

const funcionSocket = require('./dao/db/socket.js');

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

const io = new Server(server); 

funcionSocket(io);

server.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
  Database.connect()  
})

module.exports = { app, server, io };