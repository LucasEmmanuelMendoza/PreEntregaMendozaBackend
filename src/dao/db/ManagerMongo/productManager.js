const ProductsModel = require('../models/product.model.js')

class ProductManager{
    
    async addProduct(product) {
        try {
            await ProductsModel.create(product)
            return true;
        } catch(error) {
            console.log(error)
            return error
        }
    }

    async deleteProduct(id){
        try{
            const retorno = await ProductsModel.deleteOne({_id:id})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProductById(id){
        try{
            const product = await ProductsModel.findOne({_id:id}).lean()
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
            return await ProductsModel.find().lean()
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getProductsPaginate(limit, page, category, priceSort){
        try{
            let prevLink=null;
            let nextLink=null;

            const returnPaginate = await ProductsModel.paginate(
                category ? {category: category} : {},
                {
                    limit: limit ? limit : 10,
                    page: page ? page : 1,
                    sort: priceSort ? {price: priceSort} : null,
                    lean: true                                                                   
                }
            )
    
            returnPaginate.hasPrevPage ? prevLink = `http://localhost:8080/api/products?page=${returnPaginate.prevPage}&limit=${limit}&query=${category}&sort=${priceSort}` : null
            returnPaginate.hasNextPage ? nextLink = `http://localhost:8080/api/products?page=${returnPaginate.nextPage}&limit=${limit}&query=${category}&sort=${priceSort}` : null

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
            await ProductsModel.updateOne({"_id": id}, {$set: value})
            console.log('Producto modificado')
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = ProductManager