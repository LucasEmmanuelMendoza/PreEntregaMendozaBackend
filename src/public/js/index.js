const socket = io();
//const Swal = require('sweetalert2')

//================== User (Admin) ======================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btnEditUser').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const idUser = event.currentTarget.getAttribute('id-user');
            const row = event.currentTarget.closest('tr');
            const roleCell = row.querySelector('td:nth-child(6)');

            if(event.currentTarget.value === 'Save'){
                const select = roleCell.querySelector('select');
                const newRole = select.value;
                roleCell.textContent = newRole;

                const roleObj = {
                    idUser,
                    newRole
                }

                socket.emit('newRole', roleObj)

                event.currentTarget.value = 'Editar';

                const deleteBtn = event.currentTarget.parentNode.querySelector('.btnDeleteUser');
                if(deleteBtn){
                    deleteBtn.remove();
                }
                return;
            }

            const select = document.createElement('select');
            const roles = ['user', 'premium', 'admin'];
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                if(role === roleCell.textContent.trim()){
                    option.selected = true;
                }
                select.appendChild(option);
            });

            roleCell.textContent = '';
            roleCell.appendChild(select);

            event.currentTarget.value = 'Save';

            let deleteBtn = event.currentTarget.parentNode.querySelector('.btnDeleteUser');
            if(!deleteBtn){
                deleteBtn = document.createElement('input');
                deleteBtn.type = 'button';
                deleteBtn.value = 'Delete';
                deleteBtn.className = 'btn btn-danger btnDeleteUser'; 

                event.currentTarget.insertAdjacentElement('afterend', deleteBtn);

                deleteBtn.addEventListener('click', () => {
                    socket.emit('deleteUser', idUser)
                    row.remove();                    
                });
            }
        })
    })
})

//================== Rol ======================

socket.on('successRoleChange', () => {
    Swal.fire({
        icon: 'success',
        title: 'Rol cambiado con éxito',
        confirmButtonText: 'Aceptar'
    });
})
socket.on('failedRoleChange', () => {
    Swal.fire({
        icon: 'error',
        title: 'Primero debe cargar toda la documentación',
        confirmButtonText: 'Aceptar'
    });
})
const changeRole = (event) => {
    const currentUserId = event.currentTarget.getAttribute('user-id')
    socket.emit('updateRole', currentUserId)
}

document.addEventListener('DOMContentLoaded', () => {
    const btnChangeRole = document.getElementById('btnChangeRole')
    //console.log(btnChangeRole)
    if(btnChangeRole != null){
        btnChangeRole.addEventListener('click', changeRole)
    }
});

//================== Mod Prod ======================
document.addEventListener('DOMContentLoaded', () =>{
    document.querySelectorAll('.btnGoToMod').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const userEmail = event.currentTarget.getAttribute('user-id') 
            const owner = event.currentTarget.getAttribute('owner-id')

            if(owner !== userEmail){
                alert('No tenés permiso para modificar este producto')
                event.preventDefault();
            }
        })
    })
}) 

//modificar producto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('modProductForm')

    if(form != null){
        form.addEventListener('submit', (event) => {
            //event.preventDefault()
            const productId = form.querySelector('input[type="submit"]').getAttribute('product-id')
            const userEmail = form.querySelector('input[type="submit"]').getAttribute('userEmail-id')
            
            const newProd = {
                title: document.getElementById("modTitle").value,
                description: document.getElementById("modDescription").value,
                category: document.getElementById("modCategory").value,
                price: parseInt(document.getElementById("modPrice").value),
                code: parseInt(document.getElementById("modCode").value),
                stock: parseInt(document.getElementById("modStock").value),
                thumbnail: document.getElementById("modThumbnail").value,
                owner: userEmail,
                status: true,
                _id: productId
            };

            if(newProd.title && newProd.description && newProd.stock && newProd.thumbnail && newProd.code && newProd.price && newProd.category) {
                socket.emit('updateProd', newProd);
            }else{
                console.log('Todos los campos son obligatorios');
            }
        });
    }
});

//================== Cart ======================

socket.on('successDeleteCart', () => {
    Swal.fire({
        icon: 'success',
        title: 'Carrito Vaciado',
        confirmButtonText: 'Aceptar'
    });
})

const btnDeleteCart = document.getElementById('btnDeletecart')

const deleteCart = (event) => {
    const cartId = event.currentTarget.getAttribute('cart-id');
    socket.emit('deleteCart', cartId);
}

if(btnDeleteCart != null){
    btnDeleteCart.addEventListener('click',deleteCart )
}

const deleteFromCart = (event) => {
    const cartId = event.currentTarget.getAttribute('cart-id');
    const productId = event.currentTarget.getAttribute('product-id')

    const data = {
        cartId,
        productId
    }

    socket.emit('deleteFromCart', data)
}

const btnsDeleteFromCart = document.querySelectorAll('.btnDeleteFromCart')

if(btnsDeleteFromCart != null ){
    btnsDeleteFromCart.forEach(button => {
        button.addEventListener('click', deleteFromCart);
    });
}

socket.on('successDeleteFromCart', () => {
    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado del carro',
        confirmButtonText: 'Aceptar'
    });
})

const addToCart = (event) => {
    const prod = event.currentTarget.getAttribute('data-id')
    const cartId = event.currentTarget.getAttribute('cart-id');
    const rol = event.currentTarget.getAttribute('role-id')
    const email = event.currentTarget.getAttribute('email-id')

    const cart = {
        cartId,
        prod,
        rol,
        email
    }    
    //alert(`Producto ${cart.prod} agregado al carro`)
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

//================== Email ======================
//1)Enviar mail
const btnSendEmail = document.getElementById('btn_email')
const inputMail = document.getElementById('inputMail')

if(btnSendEmail, inputMail){
    btnSendEmail.addEventListener('click', function(){
        localStorage.setItem('userEmail', inputMail.value)
        socket.emit('sendEmail', inputMail.value )}
    )
}

//2)Cambiar contraseña
const pass1 = document.getElementById('newPass1')
const pass2 = document.getElementById('newPass2')
const btnChangePass = document.getElementById('btn_ChangePassword')

if(btnChangePass){
    btnChangePass.addEventListener('click', function(){
        const inputMail = localStorage.getItem('userEmail');
        if(inputMail){
            const data = {
                pass1:pass1.value,
                pass2:pass2.value, 
                inputMail: inputMail 
            }
            socket.emit('changePassword', data)
        }
    })
}

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
//deleteProd
const deleteProd = (event) => {
    const idProd = event.currentTarget.getAttribute('delete-id');
    const user = event.currentTarget.getAttribute('user-id')

    const deleteObj={
        idProd,
        user
    }

    socket.emit('deleteProd', deleteObj)
    return false
} 

const deleteButtons = document.querySelectorAll('.btn-delete');  

deleteButtons.forEach(button => {
    button.addEventListener('click', deleteProd)
})

socket.on('confirmDelete', (data) => {
    if(data){
        Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            text: 'El producto ha sido eliminado exitosamente.',
            confirmButtonText: 'Aceptar'
        });
    }
})
 
//add
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm')

    if(form != null) {
        form.addEventListener('submit', (event) => {
            //event.preventDefault()
            const userEmail = form.querySelector('input[type="submit"]').getAttribute('userEmail-id')
            const newProd = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                category: document.getElementById("category").value,
                price: parseInt(document.getElementById("price").value),
                code: parseInt(document.getElementById("code").value),
                stock: parseInt(document.getElementById("stock").value),
                thumbnail: document.getElementById("thumbnail").value,
                status: true,
                owner: userEmail
            };

            if(newProd.title && newProd.description && newProd.stock && newProd.thumbnail && newProd.code && newProd.price && newProd.category) {
                socket.emit('addProd', newProd);
            }else{
                console.log('Todos los campos son obligatorios');
            }
        });
    }
});

const render = (dataProds) => {
    let arrayMap = dataProds.map( prod => {
        return(`
            <div class="card" style="width: 18rem;">
            <input type="submit" delete-id="${prod._id}" user-id="${prod.user}" class="btn btn-danger position-absolute m-1 btn-delete" value="X">                        
                <img src=${prod.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">
                    <h1 class="card-title">${prod.title}</h1>
                    <small>id: ${prod._id}</small>
                    <p class="card-text">${prod.description}</p>
                    <h3 class="card-text">Categoria: ${prod.category}</h3>
                    <h4 class="card-text">$${prod.price}</h4>
                    <h5 class="card-text">Código: ${prod.code}</h5>
                    <p class="card-text">Cant: ${prod.stock}</p>         
                    <a user-id="${prod.user}" owner-id="${prod.owner}" class="btn btn-warning btnGoToMod" href="http://localhost:8080/views/products/mod/${prod._id}">Modificar</a>
                </div>
            </div>`
        )
    }).join(' ')
    
    document.getElementById('cajaProds').innerHTML = arrayMap
}

//productosServidor de app.js
socket.on('productosServidor', (data) => {
    render(data)
})

//================================= Ticket ===================================

const addTicket = async(event) => {
    try{
        const email = document.getElementById('emailPurchaser').value
        const totalPrice = parseFloat(event.currentTarget.getAttribute('totalPrice-id'));
        const cartId = event.currentTarget.getAttribute('cartId-id')

        const date = new Date()
        const purchase_dateTime = date.toISOString() 

        const ticket = {
            cartId,
            purchase_dateTime,
            amount: totalPrice,
            purchaser: email
        } 

        socket.emit('addTicket', ticket)}
    catch(error){
        console.log('Error:', error.cause)
        res.status(500).send({error: error.code, message: error.message})
    }
}
const btnPurchase = document.getElementById('btnPurchase');

if(btnPurchase != null){
    btnPurchase.addEventListener('click', addTicket); 
}

socket.on('successTicket', () => {
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        text: 'Recibirá un email con los datos de la compra',
        confirmButtonText: 'Aceptar'
    })
})