import { Router } from "express";
import CartManager from "../src/cartManager";

const cartManager = new CartManager('./carts.json')

const routerCarts = Router()
