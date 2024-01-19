const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');

class ProductManager{ 

    constructor() {
        this.path = path.join(__dirname, '../productos.json');
    }

    async updateProduct(id, campo, valor){
        try{
            const data =  await fs.promises.readFile(this.path, 'utf-8')

            const productos = JSON.parse(data)

            if(campo!=="obj"){//si se pasa el campo, lo modifico
                const prodsFiltrados = productos.map((prod) => {
                    if(prod.id === id){
                        return{
                            ...prod,
                            [campo]: valor,
                        }
                    }else{
                        return prod;
                    }
                })
                //guardo en fs los prodsFiltrados
                await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t'))
            }else{//se pasa el objeto entero
                if(typeof valor === 'object' && valor !== null){
                    //saco el producto con el id pasado como parámetro del storage
                    const prodsFiltrados2 = productos.filter((prod) => prod.id !== id);

                    //actualizo el storage sin el producto
                    await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))

                    //creo un nuevo producto, manteniendo el id
                    const newProd = {
                        ...valor,
                        id: id,
                    }

                    //agrego el producto al array
                    prodsFiltrados2.push(newProd);
                    //guardo los productos
                    await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))
                }
            }
            console.log("Prods actualizados");
            return true;
        }catch(error){
            console.log(error)
        }
    }

    async deleteProduct(id){
        try{
            console.log("id:", id)
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data)
            const prodsFiltrados = productos.filter((prod) => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t')) 
            return true
        }catch(error){
            console.log(error);
        }
    }

    async getProductById(id){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            const prodFiltrado = productos.find((prod) => prod.id === id)
            return prodFiltrado;
        }
        catch(error){
            console.log(error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock, category){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const productos = JSON.parse(data);
            let mayorId = productos.reduce((id, prodId) => Number(id) > Number(prodId.id)? id : prodId.id, productos[0].id)
            console.log("MaryorId:", mayorId);
            const newId = uuid.v4();

            if(!title || !description || !price || !code || !stock ||!category){
                console.log("Excepto 'thumbnail', todos los campos son obligatorios");
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
                    return true
                }else{
                    console.log('El código que ingresó pertenece a un producto existente');
                    return false
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
/* export default ProductManager
export default ProductManager;*/