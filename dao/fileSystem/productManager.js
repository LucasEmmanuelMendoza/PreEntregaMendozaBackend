const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class ProductManager{ 

    constructor() {
        this.path = path.join(__dirname, 'productos2.json');
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

    async addProduct(title, description, price, thumbnail, code, stock, category){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            const newId = uuidv4()

            if(!title || !description || !price || !code || !stock ||!category){
                console.log("Excepto 'thumbnail', todos los campos son obligatorios");
                return 3
            }else{
                const existsCode = productos.find((p) => p.code === code);
                
                if(!existsCode){
                    const prod = {
                        id: newId,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        category: category,
                        stock: stock,
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

    async getProducts(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            return productos;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ProductManager