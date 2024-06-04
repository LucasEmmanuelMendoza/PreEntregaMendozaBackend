const ProductModel = require('../dao/db/models/product.model.js')

class ProductManagerMongo{
    async addProduct(product) {
        try {
            const result = await ProductModel.create(product)
            console.log(result)
            return true;
        } catch(error) {
            console.log(error)
            return error
        }
    }

    async deleteProduct(id){
        try{
            const retorno = await ProductModel.deleteOne({_id:id})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProductById(id){
        try{
            const product = await ProductModel.findOne({_id:id}).lean()
            if(product != null){
                return product
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProducts(){
        try{
            return await ProductModel.find().lean()
        }catch(error){
            console.log(error)
            return error
        }
    }

    async getProductsPaginate(limit, page, category, priceSort){
        try{
            let prevLink=null;
            let nextLink=null;

            const returnPaginate = await ProductModel.paginate(
                category ? {category: category} : {},
                {
                    limit: limit ? limit : 10,
                    page: page ? page : 1,
                    sort: priceSort ? {price: priceSort} : null,
                    lean: true                                                                   
                }
            )
    
            returnPaginate.hasPrevPage ? prevLink = `http://localhost:8080/api/products?page=${returnPaginate.prevPage}&limit=${limit}&query=${category}&sort=${sort}` : null
            returnPaginate.hasNextPage ? nextLink = `http://localhost:8080/api/products?page=${returnPaginate.nextPage}&limit=${limit}&query=${category}&sort=${sort}` : null

            const returnGetProducts = {
                success: true,
                payload: returnPaginate.docs,
                totalPages: returnPaginate.totalPages,
                prevPage: returnPaginate.prevPage,
                nextPage: returnPaginate.nextPage,
                page: returnPaginate.page,
                hasPrevPage: returnPaginate.hasPrevPage,
                hasNextPage: returnPaginate.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink
            }
            return returnGetProducts;
        }catch(error){
            console.log(error)
            return false
        }
    }

    async updateProduct(id, value){
        try{
            await ProductModel.updateOne({"_id": id}, {$set: value})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = ProductManagerMongo