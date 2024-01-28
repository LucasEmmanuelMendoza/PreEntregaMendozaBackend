//cliente
const socket = io()

const addNewProd= () => {
    const newProd = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit('msjProd', newProd)
    return false
}

const render = (dataProds) => {
    let arrayMap = dataProds.map( prod => {
        return(
            `
            <div class="card" style="width: 18rem;">
            <img src=${prod.thumbnail}class="card-img-top" alt="...">
            <div class="card-body">
                <h1 class="card-title">${prod.title}</h1>
                <p class="card-text">Cant: ${prod.price}</p>
                <p class="card-text">${prod.description}</p>
                <h3 class="card-text">Categoria: ${prod.category}</h3>
                <h5 class="card-text">Código: ${prod.code}</h5>
                <p class="card-text">Cant: ${prod.stock}</p>
                
                <a href="#" class="btn btn-primary">Comprar</a>
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