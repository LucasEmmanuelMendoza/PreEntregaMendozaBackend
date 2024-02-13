//cliente
const socket = io()

const deleteProd = () => {
    const idProd = document.getElementById("inputDelete").value
    socket.emit('deleteProd', idProd)
}

const addNewProd = () => {
    const newProd = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        price: parseInt(document.getElementById("price").value),
        code: parseInt(document.getElementById("code").value),
        stock: parseInt(document.getElementById("stock").value),
        thumbnail: document.getElementById("thumbnail").value,
        status:true
    }

    socket.emit('addProd', newProd)

    console.log("Add Product")
}

const render = (dataProds) => {
    let arrayMap = dataProds.map( prod => {
        return(
            `
            <div class="card" style="width: 18rem;">
                <img src=${prod.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">

                    <h1 class="card-title">${prod.title}</h1>
                    <small>Id: ${prod.id}</small>
                    <p class="card-text">${prod.description}</p>
                    <h3 class="card-text">Categoria: ${prod.category}</h3>
                    <h4 class="card-text">$${prod.price}</h4>
                    <h5 class="card-text">Código: ${prod.code}</h5>
                    <p class="card-text">Cant: ${prod.stock}</p>
                    <input type="button" class="btn btn-success" value="Comprar">
                    <input type="button" class="btn btn-danger" id=${prod.code} value="Eliminar">
                </div>
            </div>
            `
        )
    }).join(' ')
    
    document.getElementById('cajaProds').innerHTML = arrayMap
}

//productosServidor de app.js
socket.on('productosServidor', (data) => {
    render(data)
})