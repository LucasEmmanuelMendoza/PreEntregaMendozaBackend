import mongoose from 'mongoose';
import { expect } from 'chai'; // Correctly import 'expect'
import ProductManagerMongo from '../controller/productManager.js';

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB');

describe('Testing Products Dao', function () {
    before(function () {
        this.product = new ProductManagerMongo();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    // test 01
    it('El dao debe devolver los productos en formato de arreglo', async function () {
        // given
        const isArray = true;

        // then
        const result = await this.product.getProducts();

        // assert
        expect(Array.isArray(result)).to.be.equal(isArray);
    });
});