class ProductManager{
    constructor(){
        this.products = [];
    }

    getProductById(id){

    }

    addProduct(title, description, price, thumbnail, code, stock){
        const prod = {
            title:title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock, stock
        }

        this.products.push(prod);
        console.log('Producto agregado ☑️');
    }

    mostrarProductos(){
        this.products.length ?         this.products.forEach(product => {
            console.log(
                `--
                 ${product.title}
                 ${product.description}
                 ${product.price}
                 ${product.code}
                 ${product.stock}
                 --`)
         }) :
         console.log("No hay productos.")
    }
}

const productos = new ProductManager();
productos.mostrarProductos();
productos.addProduct('Acer Gamer OwO','i5 8gb 265gb 4070ti', 950000,"UrlImagen", 150443, 5);
productos.addProduct('Lenovo Gamer uwu','Ryzen 3 8gb 265gb 3060ti', 550000,"UrlImagen", 150443, 5);

productos.addProduct('HP Gamer OwO','i7 8gb 512gb 4060ti', 750000,"UrlImagen", 150453, 5);
productos.addProduct('Asus OwO','i3 8gb 265gb', 350000,"UrlImagen", 1504453, 5);
productos.mostrarProductos();