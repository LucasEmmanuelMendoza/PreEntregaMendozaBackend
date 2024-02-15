const express = require("express");
const routerViews = express.Router();  

const ProductManager = require("../productManager");
const productManager = new ProductManager()

routerViews.get('/realtimeproducts', async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('realTimeProducts', {
            products:products,
        }
    )}
})

routerViews.get('/', async(req, res) => {
    const products = await productManager.getProducts()

    if(products){
        res.render('home', {
            products:products,
        }
    )}
})

module.exports =  { routerViews };