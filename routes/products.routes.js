import { Router } from "express";
import ProductManager from "..";

const productManager = new ProductManager('./productos.json')

const routerProduct = Router()

//última pre entrega
/* app.get("/products", async (req, res) => {
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
}); */
//========================

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
})

routerProduct.delete('/:pid', async(req, res) => {
  const id = req.params.pid
  
})

