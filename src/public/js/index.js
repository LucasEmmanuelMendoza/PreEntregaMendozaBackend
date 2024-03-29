//cliente
const socket = io()

//================== Cart =======================
const addToCart = (event) => {
    const cart={
        cartId: document.getElementById('cartId').value,
        prod: event.currentTarget.getAttribute('data-id')
    }
    alert("Producto agregado al carro");
    socket.emit('prodToCart', cart)
}

const buttons = document.querySelectorAll('.btnAddToCart');

buttons.forEach(button => {
    button.addEventListener('click', addToCart);
});

const renderCart = (dataCart) => {
    const cart = `
        <div>
            ${dataCart._id}
            ${dataCart.products}
        </div>`
    document.getElementById("cart").innerHTML = cart;
}

socket.on('cartServidor', (data) => {
    renderCart(data)
})

//================== Messages =======================
const addMsg = () => {
    const newMsg = {
        user: document.getElementById('user').value,
        message: document.getElementById('message').value
    }

    document.getElementById('message').value = '';
    
    socket.emit('newMsg', newMsg)
    return false
}

const renderMsg = (dataMessages) =>{
    const arrayMap = dataMessages.map( msg => {
        return(
            `<div>
                <h2>${msg.user}:</h2><p>${msg.message}</p>
            </div>`
        )
    }).join(' ')

    document.getElementById("cajaMensajes").innerHTML = arrayMap
}

socket.on('messagesServidor', (data) => {
    renderMsg(data)
})

//=================== Products ==========================

const deleteProd = () => {
    const idProd = document.getElementById("inputDelete").value;

    document.getElementById('inputDelete').value = "";

    socket.emit('deleteProd', idProd)
    return false
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
}

const render = (dataProds) => {
    let arrayMap = dataProds.map( prod => {
        return(
            `
            <div class="card" style="width: 18rem;">
                <img src=${prod.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">

                    <h1 class="card-title">${prod.title}</h1>
                    <small>id: ${prod._id}</small>
                    <p class="card-text">${prod.description}</p>
                    <h3 class="card-text">Categoria: ${prod.category}</h3>
                    <h4 class="card-text">$${prod.price}</h4>
                    <h5 class="card-text">Código: ${prod.code}</h5>
                    <p class="card-text">Cant: ${prod.stock}</p>
                  <input type="button" class="btn btn-success" value="Comprar">
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