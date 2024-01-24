/* import carts from './routes/cart.routes.js';
const {routerCarts} = carts; */
const carts = require('./routes/cart.routes.js');
const routerCarts = carts.routerCarts;
/* 
import prods from './routes/products.routes.js';
const {routerProduct} = prods;
 */
const prods = require('./routes/products.routes.js');
const routerProduct = prods.routerProduct;

const express = require("express");

const PORT = 8080

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)

app.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
}) 