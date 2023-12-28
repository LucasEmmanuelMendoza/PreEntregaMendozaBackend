const fs = require('fs');

class ProductManager{
    static id = 1;

    constructor(path){//
        this.path = path;
    }

    deleteProduct(id){
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
            return [];
        })
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos son obligatorios");
        }else{
            const existsCode = this.products.find((p) => p.code === code);
            
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
        
                this.products.push(prod);
        
                ProductManager.id++;
                console.log('Producto agregado ☑️');
            }else{
                console.log('El código que ingresó pertenece a un producto existente');
            }
        }
    }

     /*getProducts(){ 
       const productos = JSON.parse(await fs.promises.readFile('productos.json', 'utf-8')); 
        return fs.promises.readFile(this.path, 'utf-8')
            .then(data => {
                const productos = JSON.parse(data);
                return productos;
            })
            .catch(error => {
                console.log(error);
                return [];
            })
    }*/

       getProducts(){ 
       /*const productos = JSON.parse(await fs.promises.readFile('productos.json', 'utf-8')); */
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
/* const prods = productos.getProducts();
console.log(prods); -> Promise pending
productos.getProducts().then(prods => {
    console.log(prods);
})*/

productos.getProductById(4).then(prod =>{
    console.log(prod);
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
 