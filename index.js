const fs = require('fs'); 

class ProductManager{
    static id = 0;

    constructor(path){//
        this.path = path;
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

const productos = new ProductManager('productos.json'); /* 
productos.addProduct('Acer 15','i5 8gb 265gb', 950000,"UrlImagen", 150443, 5);
productos.addProduct('HP Gamer','i7 8gb 512gb 4060ti', 750000,"UrlImagen", 150453, 3); */

productos.updateProduct(10, "obj", 	{
    "id": 10,
    "title": "Hola",
    "thumbnail": "https://img1.cgtrader.com/items/3323407/83e613fb3a/harry-potter-print-ready-3d-model-3d-model-obj-stl-ztl.jpg",
    "description": "HarryPotter",
    "price": 2529.51,
    "stock": 15,
    "code": 1016
});

productos.updateProduct(6,"stock", 20);

//Pruebas
/* productos.getProducts().then(productos => {
    console.log("getProducts:");
    console.log(productos);
})

productos.getProducts().then(prods => {
    console.log(prods);
})

productos.addProduct('Acer 15','i5 8gb 265gb', 950000,"UrlImagen", 152443, 5).then(retornoAdd => {
    console.log(retornoAdd)
}) 

productos.getProducts().then(productos => {
    console.log("Productos:",productos);
})*/
/* let opcion = parseInt(prompt("Ingrese una opción:\n1)Agregar producto\n2)Mostrar productos\n3)Buscar producto por su id\n4)Salir"));
while(opcion != 4){

    switch(opcion){
        case 1:
        const title = prompt("Ingrese el título del producto:");
        const description = prompt("Ingrese la descripción:")
        const price = parseFloat(prompt("Ingrese el precio:"));
        const thumbnail = prompt("Ingrese la ruta de imagen:");
        const code = parseInt(prompt("Ingrese el código:"));
        const stock = parseInt(prompt("Ingrese la cantidad:"));
        productos.addProduct(title, description, price, thumbnail, code, stock);
        break;
        
        case 2:
            const prodsArray = productos.getProducts();
            prodsArray.length ? prodsArray.forEach(product => {
                console.log(`id - ${product.id}\ntitle - ${product.title}\ndescription - ${product.description}\nprice - $${product.price}\ncode - ${product.code}\nstock - ${product.stock}`)
            }) :
             console.log("No hay productos.");
        break;

        case 3:
            const idProd = parseInt(prompt("Ingrese el id del producto:"));
            productos.getProductById(idProd);
        break;
    }

    opcion = parseInt(prompt("Ingrese una opción:\n1)Agregar producto\n2)Mostrar productos\n3)Buscar producto por su id\n4)Salir "));
} */
 