import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";
import CartManager from '../controller/cartManager.js'

const requester = supertest('http://localhost:8080')

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB')

describe('Testing Cart Routes', () => {
    before(function () {
        this.cart = new CartManager();
    });
    
    beforeEach(function(){
        this.timeout(5000)
    })
    //npx mocha src/tests/Carts.supertest.mjs
    //test 01
    it('Crear carrito: El API POST /api/carts debe agregar un nuevo carrito a la db', async() => {
        const result = await requester.post('/api/carts')
        
        expect(result.statusCode).is.eql(200)
    })

    //test 02
    it('Obtener carrito por id: El API GET /api/carts/:cid debe devolver un carrito de la db', async() => {
        const cartId = '662df9bc3ec178d46e5fe075'
        
        const {_body} = await requester.get(`/api/carts/${cartId}`)

        expect(_body).to.have.property('_id')
    }) 

     //test 03
    /*it('Eliminar carrito por id: El API DELETE /api/carts/:cid debe eliminar un carrito de la db', async() => {
        const cartId = '663087f3b230c5b5a7720496'
        
        const result = await requester.delete(`/api/carts/${cartId}`)

        //console.log('result:', result)
        expect(result).to.be.ok
        expect(result.statusCode).to.be.deep.eql(200)
    })*/
    
    //test 04
    it('Agregar un producto a un carrito: El API POST /api/carts/:cid/product/:pid debe agregar un producto a un carrito', async() => {
        const cid = '665fab8cf714714df67b7982'
        const pid = '664d8c166f0dabcf4e190610'
        
        const result = await requester.post(`/api/carts/${cid}/product/${pid}`)

        //console.log('result:', result)  
        expect(result.statusCode).to.be.ok 
    }) 
    
 /* npx mocha src/tests/Carts.supertest.mjs*/
    


})