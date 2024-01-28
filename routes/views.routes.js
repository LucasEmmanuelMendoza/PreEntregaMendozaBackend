const express = require("express");
const routerViews = express.Router();  

const ProductManager = require("../src/productManager.js");

const productManager = new ProductManager()

routerViews.get('/realtimeproducts', async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('realTimeProducts', {
            products:products,
        }
    )}
})

module.exports =  { routerViews };