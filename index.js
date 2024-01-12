const fs = require('fs'); 

class ProductManager{
    static id = 0;

    constructor(path){//
        this.path = './productos.json';
    }

    updateProduct(id, campo, valor){
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data)
                if(campo!="obj"){//si se pasa el campo, lo modifico
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
                    return fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t'))
                        .then(() => {
                            console.log("Prods actualizados");
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }else{//se pasa el objeto entero
                    if(typeof valor === 'object' && valor !== null){
                        //saco el producto con el id pasado como parámetro del storage
                        const prodsFiltrados2 = productos.filter((prod) => prod.id !== id);

                        //actualizo el storage sin el producto
                        fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))
                        .then(() => {
                            console.log("Prods actualizados");
                        })
                        .catch(err => {
                            console.log(err);
                        })

                        //creo un nuevo producto, manteniendo el id
                        const newProd = {
                            ...valor,
                            id: id,
                        }
                        ProductManager.id++;

                        //agrego el producto al array
                        prodsFiltrados2.push(newProd);
                        //guardo los productos
                        fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados2, null, '\t'))
                        .then(() => {
                            console.log("Prods actualizados");
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                }
            })
    }

    deleteProduct(id){
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data);
                const prodsFiltrados = productos.filter((prod) => prod.id !== id); 
                return fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t'))
                    .then(
                        console.log("Prods actualizados")
                    )
                    .catch(error =>{
                        console.log(error)
                        }
                    )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getProductById(id){
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data);
                const prodFiltrado = productos.find((prod) => prod.id === id)
                return prodFiltrado;
            })
            .catch(error => {
                console.log(error);
            })
    }

    addProduct(title, description, price, thumbnail, code, stock){
        //Leo el archivo para obtener el mayor id
        return fs.promises.readFile(this.path, 'utf-8')
        .then(data => {
            const productos = JSON.parse(data);
            let mayorId = productos.reduce((id, prodId) => Number(id) > Number(prodId.id)? id : prodId.id, productos[0].id)
            console.log("MaryorId:", mayorId);
            ProductManager.id = mayorId + 1;

            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.log("Todos los campos son obligatorios");
            }else{
                const existsCode = productos.find((p) => p.code === code);
                
                if(!existsCode){
                    const prod = {
                        id: ProductManager.id,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock
                    }
                    productos.push(prod);
                    fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t')); 
                    return "Producto agregado☑️";
                }else{
                    console.log('El código que ingresó pertenece a un producto existente');
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    getProducts(){ 
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data);
                return productos;
            })
            .catch(error => {
                console.log(error);
                return [];
            })
    }
}

module.exports = ProductManager