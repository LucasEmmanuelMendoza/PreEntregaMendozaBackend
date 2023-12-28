const fs = require('fs');

class ProductManager{
    static id = 0;

    constructor(path){//
        this.path = path;
    }

    deleteProduct(id){
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data);
                const prodsFiltrados = productos.filter((prod) => prod.id !== id); 
                return fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados, null, '\t')); 
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

console.log("================================================================================")

productos.getProducts().then(productos => {
    console.log("getProducts:");
    console.log(productos);
})

productos.getProducts().then(prods => {
    console.log(prods);
})

productos.addProduct('Acer 15','i5 8gb 265gb', 950000,"UrlImagen", 152443, 5).then(retornoAdd => {
    console.log(retornoAdd)
})

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
 