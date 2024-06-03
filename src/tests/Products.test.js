const mongoose = require('mongoose')
const ProductManagerMongo = require('../controller/productManager.js')
const Assert = require('assert')

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB')

const assert = Assert.strict

describe('Testing Products Dao', () => {
    before(function(){
        this.product = new ProductManagerMongo()
    })
    beforeEach(function(){
        this.timeout(5000)
    })

    //test 01
    it('El dao debe devolver los productos en formato de arreglo', async function(){
        //give
        const isArray = true

        //then
        const result = await this.product.getProducts()
        
        //assert
        assert.strictEqual(Array.isArray(result), isArray)
    })

})