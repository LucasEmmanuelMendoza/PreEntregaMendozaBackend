class ProductManager{
    static id = 1;

    constructor(){
        this.products = [];
    }

    getProductById(id){

    }

    addProduct(title, description, price, thumbnail, code, stock){
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
    }

    getProducts(){
        return this.products;
    }

        /*     mostrarProductos(){
        this.products.length ?         this.products.forEach(product => {
            console.log(
                `--
                 ${product.id}
                 ${product.title}
                 ${product.description}
                 ${product.price}
                 ${product.code}
                 ${product.stock}
                 --`)
         }) :
         console.log("No hay productos.")
    } */
}

const productos = new ProductManager(); 
productos.addProduct('Acer Gamer OwO','i5 8gb 265gb 4070ti', 950000,"UrlImagen", 150443, 5);
productos.addProduct('HP Gamer OwO','i7 8gb 512gb 4060ti', 750000,"UrlImagen", 150453, 5);

console.log(productos.getProducts());
