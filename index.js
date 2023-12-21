class ProductManager{
    static id = 1;

    constructor(){
        this.products = [];
    }

    getProductById(id){
        const prod = this.products.find((p) => p.id === id)

        if(prod){
            console.log(prod);
        }else{
            console.log('Not found');
        }
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

    getProducts(){
        return this.products;
    } 
}

const productos = new ProductManager(); 
productos.addProduct('Acer 15','i5 8gb 265gb', 950000,"UrlImagen", 150443, 5);
productos.addProduct('HP Gamer','i7 8gb 512gb 4060ti', 750000,"UrlImagen", 150453, 3);


let opcion = parseInt(prompt("Ingrese una opción:\n1)Agregar producto\n2)Mostrar productos\n3)Buscar producto por su id\n4)Salir"));
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
} 
