//cliente
const socket = io()

const addNewProd= () => {
    const newProd = {
        title: document.getElementById("title"),
        description: document.getElementById("description"),
        category: document.getElementById("category"),
        price: document.getElementById("price"),
        code: document.getElementById("code"),
        stock: document.getElementById("stock"),
        thumbnail: document.getElementById("thumbnail")
    }

    socket.emit('msjProd', newProd)
    return false
}

const render = (dataProds) => {
    let arrayMap = dataProds.map( prod => {
        return(
            `<div>
                <h1>${prod.title}</h1>
                <p>${prod.description}</p>
                <p>${prod.category}</p>
                <p>${prod.price}</p>
                <p>${prod.stock}</p>
                <p>${prod.code}</p>
                <p>${prod.thumbnail}</p>
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