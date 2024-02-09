const express = require("express");
const routerProduct = express.Router();  
/* 
const ProductManager = require("../src/productManager.js"); */
const ProductManager = require('../productManager.js')

const productManager = new ProductManager() 

routerProduct.get('/', async(req, res) => {
    let products = await productManager.getProducts()
    const limit = req.query.limit

   if(limit){
      products = products.slice(0, limit)
    }
     products ? res.status(200).send(products) : res.status(400).send('No se encontraron productos')
})

routerProduct.get('/:pid', async(req, res) => {
  const id = req.params.pid
  const productFound = await productManager.getProductById(id)

  productFound ? res.status(200).send(productFound) : res.status(400).send('No se encontró el producto - id incorrecto')
})

routerProduct.post('/', async(req, res) => {
  const prod = req.body

  const retorno = await productManager.addProduct(prod.title, prod.description, prod.price, prod.thumbnail, prod.code, prod.stock, prod.category)

  switch (retorno){
    case 1:
      res.status(200).send("Producto agregado")
      break;

    case 2:
      res.status(400).send("Error. El código pertenece a un producto existente")
      break;

    case 3:
      res.status(400).send("Error. Todos los campos son obligatorios")
      break;
  }
})

//async updateProduct(id, valor){
routerProduct.put('/:pid', async(req, res) => {
  const id = req.params.pid
  const newProd = req.body;

  const retorno = await productManager.updateProduct(id, newProd)
  
  switch(retorno){
    case 1:
      res.status(200).send("Producto actualizado")
    break;

    case 0:
      res.status(400).send("Error. Id no encontrado")
    break;
    
    case 2:
      res.status(400).send("Error, debe pasarse el objeto del producto")
    break;
  }

})

routerProduct.delete('/:pid', async(req, res) => {
  const id = req.params.pid

  const retorno = await productManager.deleteProduct(id)

  console.log("Retorno:", retorno)

  retorno ? res.status(200).send("Producto borrado") : res.status(400).send('Error al eliminar el producto - ID incorrecto')
})

module.exports =  { routerProduct };