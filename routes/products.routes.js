import { Router } from "express";
import ProductManager from "..";

const productManager = new ProductManager('./productos.json')

const routerProduct = Router()

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

routerProduct.get('/', async(req, res) => {
        
})
