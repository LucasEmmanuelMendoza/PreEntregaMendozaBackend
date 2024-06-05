import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";


const requester = supertest('http://localhost:8080')

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB')

describe('Testing Session Routes', () => {
    before(function () {
        this.mockUser = {
            "_id": "66303d8835e8143afa9da179",
            "first_name": "Lucas Emmanuel",
            "last_name": "Mendoza",
            "email": "a@gmail.com",
            "age": 22,
            "password": "$2b$10$mhZujsMnyUaHHn/2dFx2O.0j/2uzoInkMuc6.lWUUsdnutBeC6iMK",
            "cartId": "66303d8835e8143afa9da177",
            "role": "user"
          }
    });

    beforeEach(function(){
        this.timeout(5000),
        this.mockUser = {
            "_id": "66303d8835e8143afa9da179",
            "first_name": "Lucas Emmanuel",
            "last_name": "Mendoza",
            "email": "a@gmail.com",
            "age": 22,
            "password": "$2b$10$mhZujsMnyUaHHn/2dFx2O.0j/2uzoInkMuc6.lWUUsdnutBeC6iMK",
            "cartId": "66303d8835e8143afa9da177",
            "role": "user"
          }
    })

    //test 01
    it('Session', async() => {

        //const result = await requester.get('/api/sessions/current')
        const result = await requester.get('/api/sessions/current').send({
            "_id": "66303d8835e8143afa9da179",
            "first_name": "Lucas Emmanuel",
            "last_name": "Mendoza",
            "email": "a@gmail.com",
            "age": 22,
            "password": "$2b$10$mhZujsMnyUaHHn/2dFx2O.0j/2uzoInkMuc6.lWUUsdnutBeC6iMK",
            "cartId": "66303d8835e8143afa9da177",
            "role": "user"
          })

        console.log('result:', result)
        
        //expect(result.statusCode).is.eql(200)
    })

    /* npx mocha src/tests/Session.supertest.mjs*/
    
})