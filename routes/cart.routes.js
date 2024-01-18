import { Router } from "express";
import CartManager from "../src/cartManager";

const cartManager = new CartManager('./carts.json')

const routerCarts = Router()

routerCarts.post('/', async(req, res) => {
    
})

routerCarts.get('/:cid', async(req, res) => {
    
})

routerCarts.post('/:cid', async(req, res) => {
    
})
