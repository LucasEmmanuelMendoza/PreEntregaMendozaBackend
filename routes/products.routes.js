import { Router } from "express";
import ProductManager from "../src/productManager";

const productManager = new ProductManager('./productos.json')

const routerProduct = Router()

routerProduct.get('/', async(req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit

    if(limit){
      products = products.slice(0, limit)
    }

    products ? res.status(200).send(products) : res.status(400).send('No se encontraron productos')
})

routerProduct.get('/:pid', async(req, res) => {
  const id = req.params.pid
  const productFound = await productManager.getProductById(id)

  productFound ? res.status(200).send(productFound) : res.status(400).send('No se encontró el producto')
})

routerProduct.post('/', async(req, res) => {
  //obtengo el producto de req.body
  const prod = req.body

  const retorno = await productManager.addProduct(prod.title, prod.description, prod.price, prod.thumbnail, prod.code, prod.stock, prod.category)

  retorno ? res.status(200).send("Producto agregado") : res.status(400).send("Error al agregar el producto")
})

//async updateProduct(id, campo, valor){
routerProduct.put('/:pid', async(req, res) => {
  const id = req.params.pid
  const newProd = req.body;

  const retorno = await productManager.updateProduct(id, "obj", newProd)
  
  retorno ? res.status(200).send("Producto actualizado") : res.status(400).send('Error al actualizar el producto')

})

routerProduct.delete('/:pid', async(req, res) => {
  const id = req.params.pid
  const retorno = await productManager.deleteProduct(id)

  retorno ? res.status(200).send("Producto borrado") : res.status(400).send('Error al eliminar el producto')
})

