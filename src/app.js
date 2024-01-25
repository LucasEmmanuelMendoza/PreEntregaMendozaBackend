const carts = require('../routes/cart.routes.js');
const routerCarts = carts.routerCarts;

const prods = require('../routes/products.routes.js');
const routerProduct = prods.routerProduct;

const express = require("express");

const PORT = 8080

const app = express();

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)

app.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
}) 