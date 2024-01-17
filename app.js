import { routerProduct } from './routes/products.routes.js'
import { express } from 'express';
import {__dirname} from './paths'
import path from 'path'

/* const express = require('express');
const ProductManager = require('./index.js') */

const app = express();
app.use(express.urlencoded({extended:true}))
const PORT = 8080

app.use('/api/products', routerProduct)

//instancio
/*let product = new ProductManager();

 app.get('/', async(req, res) => {
    res.send("Bienvenido al E-Commerce") 
})

app.get("/products", async (req, res) => {
    try {
      let limit = req.query.limit;
      let productos = await product.getProducts();
      if (limit && parseInt(limit) > 0) {
        limit = parseInt(limit);
        productos = productos.slice(0, limit);
      }

      res.send(productos);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
app.get("/products/:pid", async(req, res) => {
    let prodFound = await product.getProductById(parseInt(req.params.pid))
    res.send(prodFound)
})

app.listen(PORT, ()=> {
    console.log('Server run on port', PORT)
}) */

/* Todas estas rutas que hice en app.js sobre los productos ahora van a estar en products.routes.js
Lo mismo para las rutas de carts */