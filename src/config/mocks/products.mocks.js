const { faker } = require('@faker-js/faker/locale/es')

const generateProduct = () => {
    const status = [true, false]
    return {
        _id:faker.database.mongodbObjectId(),
        title:faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        price:faker.commerce.price(),
        thumbnail:faker.image.urlPicsumPhotos(),
        code:faker.string.alphanumeric(8),
        category:faker.commerce.productAdjective(),
        stock:faker.number.int({min:0, max:10}),
        status:faker.helpers.arrayElements(status)
    }
}

module.exports = generateProduct