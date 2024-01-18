import { routerProduct } from './routes/products.routes.js'
import { routerCarts } from './routes/cart.routes.js'
import { express } from 'express';
import {__dirname} from './paths'
import path from 'path'

/* const express = require('express');
const ProductManager = require('./index.js') */

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = 8080

app.use('/api/products', routerProduct)
app.use('/api/carts', routerCarts)

app.listen(PORT, ()=> {
  console.log('Server run on port', PORT)
}) 
