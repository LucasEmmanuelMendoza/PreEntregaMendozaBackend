const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class ProductManager{ 

    constructor() {
        this.path = path.join(__dirname, 'productos.json');
    }

    /*async addProduct(title, description, price, thumbnail, code, stock, category){ */
    async addProduct(product){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            const newId = uuidv4()

            if(!product.title || !product.description || !product.price || !product.code || !product.stock ||!product.category){
                console.log("Excepto 'thumbnail', todos los campos son obligatorios");
                return 3
            }else{
                const existsCode = productos.find((p) => p.code === product.code);
                
                if(!existsCode){
                    const prod = {
                        id: newId,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        category: product.category,
                        stock: product.stock,
                        status: true
                    }
                    productos.push(prod);
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t')); 
                    console.log("Producto agregado☑️")
                    return 1
                }else{
                    console.log('El código que ingresó pertenece a un producto existente');
                    return 2
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    async deleteProduct(id){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data)
            const existsId = productos.some(prod => prod.id === id)
            if(existsId){
                const prodsFiltrados = productos.filter((prod) => prod.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t')) 
                return true
            }
        }catch(error){
            console.log(error);
        }
    }
    
    async getProductById(id){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            const existsId = productos.some(prod => prod.id === id)
            if(existsId){
                const prodFiltrado = productos.find((prod) => prod.id === id)
                return prodFiltrado;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async getProducts(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            return productos;
        }catch(error){
            console.log(error);
        }
    }

    async updateProduct(id, valor){
        try{
            const data =  await fs.promises.readFile(this.path, 'utf-8')

            const productos = JSON.parse(data)

            const existeId = productos.some(prod => prod.id === id)

            if(existeId){
                    if(typeof valor === 'object' && valor !== null){
                        const prodsFiltrados2 = productos.filter((prod) => prod.id !== id);
    
                        await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))
    
                        const newProd = {
                            ...valor,
                            id: id,
                        }
    
                        prodsFiltrados2.push(newProd);
                        await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))
                    
                        console.log("Prods actualizados");
                        return 1;
                    }else{
                        return 2;
                    }
            }else{
                return 0;
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ProductManager