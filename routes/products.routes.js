import { Router } from "express";
import ProductManager from "..";

const productManager = new ProductManager('./productos.json')

const routerProduct = Router()



