import carts from './routes/cart.routes.cjs';
const {routerCarts} = carts;

import prods from './routes/products.routes.cjs';
const {routerProduct} = prods;

import express from 'express';

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = 8080

app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)

app.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
}) 