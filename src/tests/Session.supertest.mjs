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

        const result = await requester.get('/api/sessions/current')

        expect(result.statusCode).to.be.deep.equal(statusCode)
    })

})