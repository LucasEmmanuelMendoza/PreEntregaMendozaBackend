import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";
import ProductManagerMongo from '../controller/productManager.js';

const requester = supertest('http://localhost:8080')

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB')

describe('Testing Product Routes', () => {
    before(function () {
        this.product = new ProductManagerMongo();
    });
    
    beforeEach(function(){
        this.timeout(5000)
    })

    //test 01
    it('Devolver productos: El API GET /api/products debe devolver los productos en forma de arreglo', async() =>{
        //given
        //const isArray = true;
        
        //then
        //const result = await requester.post('/api/products').send(productMock)
        const result = await requester.get('/api/products')

        //console.log(result)
        //assert
        expect(result.statusCode).is.eql(200)
        expect(result.status).to.equal(200);
        expect(result._body).to.be.an('array');
    })

    //test 02
    it('Agregar un producto: El API POST /api/products debe agregar un producto', async() =>{
        //given
        const mockProduct = {
            title: "Producto",
            description: "asdasd",
            price: 1333,
            thumbnail: "https://files.cults3d.com/uploaders/25973187/illustration-file/2b7811f3-f2d2-4aa3-8203-8eb67b39c5a9/main.png",
            code:63434,
            category: "aadsd",
            stock: 25,
            status: true,
            owner: "admin"
        }
        
        //then
        //const result = await requester.post('/api/products').send(productMock)
        const {statusCode, _body} = await requester.post('/api/products').send(mockProduct)

        //console.log('result:', result)
        //assert
        expect(statusCode).is.eql(200)
        //expect(_body.payload).is.ok.and.to.have.property('_id')
    })

    //test03
    it('Devolver un producto: El API GET /api/products/:pid debe devolver un producto', async() => {
        const id = '665ebbc9f14caa0e9601be63'

        const {_body} =  await requester.get(`/api/products/${id}`)

        //console.log('retorno:', retorno._body)

        expect(_body).to.have.property('_id')
    })
    
    //test04
    it('Eliminar un producto: El API DELETE /api/products/:pid debe eliminar un producto', async() => {
        const productId = '665ec4aacd01f8446910292e'

        const retorno = await requester.delete(`/api/products/${productId}`)

        expect(retorno.statusCode).to.be.eql(200)

    })
})