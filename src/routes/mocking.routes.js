const express = require('express');
const generateProduct = require('../config/mocks/products.mocks');
const routerMocking = express.Router()

routerMocking.get('/', (req, res) => {
    const products = [];
    for(let i=0; i<100; i++){
        products.push(generateProduct())
    }
    res.send({status:'success', payload: products })
})

module.exports = routerMocking