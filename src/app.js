const cartsR = require('../src/routes/cart.routes.js')
const routerCarts = cartsR.routerCarts;
const prods = require('../src/routes/product.routes.js')
const routerProduct = prods.routerProduct;
const views = require('../src/routes/views.routes.js')
const routerView = views.routerViews;
const sessions = require('../src/routes/session.routes.js')
const routerSession = sessions.routerSession;

const Database = require('./dao/db/index.js')

const { Server } = require("socket.io");
const http = require('http')
const express = require("express");
const PORT = 8080
const app = express();
const server = http.createServer(app)
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const funcionSocket = require('./dao/db/socket.js');
const { routerAuth } = require('./routes/auth.routes.js');
const initializePassport = require('./config/passport.js');
const passport = require('passport');
const cors = require('cors');
const routerMocking = require('./routes/mocking.routes.js');

//Public
app.use(express.static(__dirname+'/public'))
app.set('views', __dirname+'/views')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//Motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://lucas:123@clustermendoza.0fsgvex.mongodb.net/sessions'
  }),
  secret:'secretCoder',
  resave: true,
  saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', routerSession)
app.use('/views', routerView)
app.use('/auth', routerAuth)
app.use('/routerMocking', routerMocking)

const io = new Server(server); 

funcionSocket(io);

server.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
  Database.connect()  
})

module.exports = { app, server, io };