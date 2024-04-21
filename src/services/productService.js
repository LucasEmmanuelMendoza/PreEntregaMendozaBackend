const ProductModel = require('../models/product.model.js')

class ProductService{

    async findProductsPaginate(limit, page, category, priceSort){
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
            throw error
        }
    }

    async findProductById(id){
        try{
            return await ProductModel.findById(id)
        }catch(error){
            throw error
        }
    }

    async findProducts(){
        try{
            return await ProductModel.find().lean()
        }catch(error){
            throw error
        }
    }

    async deleteProd(id){
        try{    
            return await ProductModel.findByIdAndDelete(id)
        }catch(error){
            throw error
        }
    }

    async updateProd(id, value){
        try{
            return await ProductModel.findOneAndUpdate({"_id": id}, {$set: value})
        }catch(error){
            throw error
        }
    }

    async addProd(product){
        try{
            return await ProductModel.create(product)
        }catch(error){
            throw error
        }
    }
}

module.exports = ProductService
