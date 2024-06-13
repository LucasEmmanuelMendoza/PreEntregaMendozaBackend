import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

mongoose.connect('mongodb+srv://mendozalucas001:3oTPgKzoGup6Azz0@testsdb.oqpw17l.mongodb.net/testsDB')

describe('Testing Session Routes', () => {
    beforeEach(function(){
        this.timeout(5000)
    })

    //test 01
    it('Session', async() => {
        const statusCode = 400

        //const result = await requester.get('/api/sessions/current')
        const mockUser = {
           "_id": "66303d8835e8143afa9da179",
            "first_name": "Lucas Emmanuel",
            "last_name": "Mendoza",
            "email": "a@gmail.com",
            "age": 22,
            "password": "$2b$10$mhZujsMnyUaHHn/2dFx2O.0j/2uzoInkMuc6.lWUUsdnutBeC6iMK",
            "cartId": "66303d8835e8143afa9da177",
            "role": "user"}
        /*  const result = await requester.get('/api/sessions/current').send({
            "_id": "66303d8835e8143afa9da179",
            "first_name": "Lucas Emmanuel",
            "last_name": "Mendoza",
            "email": "a@gmail.com",
            "age": 22,
            "password": "$2b$10$mhZujsMnyUaHHn/2dFx2O.0j/2uzoInkMuc6.lWUUsdnutBeC6iMK",
            "cartId": "66303d8835e8143afa9da177",
            "role": "user"
        })*/

        expect(result.statusCode).is.eql(200)

        const result = await requester.get('/api/sessions/current')

        console.log('result:', result)

        expect(result.statusCode).to.be.deep.equal(statusCode)
    })
})