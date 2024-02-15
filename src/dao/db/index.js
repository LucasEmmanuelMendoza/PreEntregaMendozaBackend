const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect("mongodb+srv://lucas:123@clustermendoza.0fsgvex.mongodb.net/ecommerce")
        .then(() => {
            console.log("Base de datos conectada")
        }).catch((error) => {
            console.log(error)
        })
    }
}