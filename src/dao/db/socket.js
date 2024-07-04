const MessageManager = require('../../controller/messageManager.js')
//const CartManager = require('../db/ManagerMongo/cartManager.js')
const CartManager = require('../../controller/cartManager.js')
//const CartManager = require('../fileSystem/cartManager.js')
const TicketManager = require('../../dao/db/ManagerMongo/ticketManager.js')
const { v4: uuidv4  } = require('uuid');
const ProductManager = require('./ManagerMongo/productManager.js');
const { EErrors } = require('../../services/errors/errors-enum.js');
const { purchaseCartErrorInfoSP } = require('../../services/errors/messages/purchase-cart-error.message.js')
const { CustomError } = require('../../services/errors/CustomError.js')
//const ProductManger = require('../fileSystem/productManager.js')
//const nodemailer = require('nodemailer');
const transporter = require('../../config/nodemailer.js')
const UserManager = require('../../controller/userManager.js');
const { isValidPassword, createHash } = require('../../utils/bcrypt.js');
const { generaTokenLink } = require('../../utils/token.js'); 

const productManager = new ProductManager()
const message = new MessageManager()
const cartManager = new CartManager()
const ticketManager = new TicketManager()
const userManager = new UserManager()

let productos = [];
(async() => {
    productos = await productManager.getProducts()
})();

let messages = [];
(async() => {
  messages = await message.getMessages()
})();  

const funcionSocket = (io) => {
  io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('newRole', async(newRoleObj) => {
    const user = await userManager.getUserById(newRoleObj.idUser)
    user.role = newRoleObj.newRole
    const returnUpdate = await userManager.updateUser(newRoleObj.idUser, user)

    if(returnUpdate){
      console.log('Rol de usuario modificado')
    }
  })

  socket.on('deleteFromCart', async(data)=> {
    const returnDeleteFromCart = await cartManager.deleteProduct(data.cartId, data.productId)
    if(returnDeleteFromCart){
      socket.emit('successDeleteFromCart')
     }
  })

  socket.on('deleteCart', async(cartId) => {
    const returnDeleteProducts = await cartManager.deleteAllProducts(cartId)
    if(returnDeleteProducts){
      socket.emit('successDeleteCart')
    }
  })

  socket.on('deleteUser', async(userId) => {
    const deletedUser = await userManager.getUserById(userId)
    const returnDelete = await userManager.deleteOneUser(userId)

    if(returnDelete){
      await cartManager.deleteCart(deletedUser.cartId)

      let mensaje = await transporter.sendMail({
        from: 'ECommerce <ecommerce@gmail.com>',
        to: deletedUser.email,
        subject: 'Cuenta eliminada',
        html: `<div>
                <h1>¡Su cuenta ha sido eliminada por inactividad!</h1>
                <img src='https://static.vecteezy.com/system/resources/previews/014/482/396/non_2x/desktop-with-face-error-free-vector.jpg' alt='imgError'>
              </div>`
      })

      if(!!mensaje.messageId){
        console.log('Mensaje enviado', mensaje.messageId)
      }
      console.log('Usuario eliminado con éxito!')
    }
  })

  socket.on('updateRole', async(userId) => {
    try{
      console.log(userId)
      const currentUser = await userManager.getUserById(userId);
      let identificacion = false;
      let domicilio = false;
      let estadoCuenta = false;

      (currentUser.documents).forEach(document => {
        if(document.name === 'identificacion'){identificacion=true}
        if(document.name === 'domicilio'){domicilio=true}
        if(document.name === 'estadoCuenta'){estadoCuenta=true}
      });
      
      if(currentUser.role === 'user'){
        if(identificacion && domicilio && estadoCuenta){
          currentUser.role = 'premium'
          const returnUpdate = await userManager.updateUser(userId, currentUser)
          if(returnUpdate){
            socket.emit('successRoleChange')
          }   
        }else{
          socket.emit('failedRoleChange')
        }
      }else{
        currentUser.role = 'user';
        const returnUpdate = await userManager.updateUser(userId, currentUser)
        if(returnUpdate){
          socket.emit('successRoleChange')
        }   
      }
   
    }catch(error){
      console.log(error)
    }
  })

  socket.on('updateProd', async(data) => {
    try{
      await productManager.updateProduct(data._id, data)
    
      console.log('Producto modificado')
      productos = await productManager.getProducts()
      socket.emit('productosServidor', productos);
    }catch(error){
      console.log(error)
    }
  })

  socket.on('addProd', (data) => {
    (async() => {  
      await productManager.addProduct(data);
      productos = await productManager.getProducts()
      console.log('Producto Agregado')
    })();
    socket.emit('productosServidor', productos.payload);
  })

  socket.on('prodToCart', (data) => { 
      (async () => {
        const prodToCart = await productManager.getProductById(data.prod)

        if(prodToCart.owner === data.email){
          console.log('No puedes agregar tus propios productos al carro')
        }else{
          await cartManager.addProduct(data.cartId, data.prod)
          console.log(`Producto ${data.prod} agregado al carro`)
        }  
      })();
    })

  socket.on('deleteProd', async(data) => {
    //data.user = userEmail
    try{
      const prodDelete = await productManager.getProductById(data.idProd);
      if(prodDelete.owner === data.user || data.user === 'adminCoder@coder.com'){
        const carts = await cartManager.getAllCarts();

        for(const cart of carts){
          await cartManager.deleteProduct(cart._id, prodDelete._id);
        }

        const returnDelete = await productManager.deleteProduct(data.idProd);

        //productos = productos.filter((prod) => prod._id != data.idProd);
        productos = productos.map(product => ({ ...product, user: data.user }));
        
        productos = await productManager.getProducts()

        console.log('Producto eliminado')
        socket.emit('productosServidor', productos);
        socket.emit('confirmDelete', returnDelete)

        if(data.user === 'adminCoder@coder.com'){
          if(returnDelete){
            let mensaje = await transporter.sendMail({
              from: 'ECommerce <ecommerce@gmail.com>',
              to: prodDelete.owner,
              subject: 'Producto eliminado',
              html: `<div>
                      <h1>¡Su producto ha sido eliminado del Ecommerce!</h1>
                      <img src='https://static.vecteezy.com/system/resources/previews/014/482/396/non_2x/desktop-with-face-error-free-vector.jpg' alt='imgError'>
                    </div>`
            })
      
            if(!!mensaje.messageId){
              console.log('Mensaje enviado', mensaje.messageId)
            }
          }
        }
        
      }else{
        console.log('No tienes permiso para eliminar este producto')
      }
    }catch(error){
      console.log(error)
    }
  }) 

  socket.on('newMsg', (data) => {
    messages.push(data);
    (async() => {
      await message.addMessage(data);
    })();
      io.sockets.emit('messagesServidor', messages);
    })

  socket.on('addTicket', async(ticket) => {
      try{          
          const code = uuidv4(); 
          const cart = await cartManager.getCartById(ticket.cartId);
          const products = await productManager.getProducts();
  
          let newAmount = 0;
          const cartPurchase = [];
  
          const newTicket = {
            code,
            purchase_dateTime: ticket.purchase_dateTime,
            amount: newAmount,
            purchaser: ticket.purchaser,
          }

          for(prodCart of cart.products){
            for(prod of products){
                if((prodCart.product._id.toString() === prod._id.toString()) && (prodCart.quantity <= prod.stock)){
                prod.stock -= prodCart.quantity;
                await productManager.updateProduct(prod._id, prod)
                cartPurchase.push(prodCart);
                newTicket.amount += prodCart.quantity * prodCart.product.price
                await cartManager.deleteProduct(cart._id, prodCart.product._id)
              }
            }
          };

          console.log('newTicket:', newTicket)

          if (!newTicket.purchaser || newTicket.purchaser.trim() === '' || newTicket.purchaser === '') {
            throw CustomError.createError({
              name: 'Invalid Ticket Data',
              cause: purchaseCartErrorInfoSP({newTicket}),
              message: 'Purchaser field cannot be empty',
              code: EErrors.INVALID_TYPES_ERROR
            });
          }
  
        if(newTicket.amount > 0){
          const addTicket = await ticketManager.addTicket(newTicket)

          if(addTicket){
            let mensaje = await transporter.sendMail({
              from: 'ECommerce <ecommerce@gmail.com>',
              to: newTicket.purchaser,
              subject: 'Ticket de compra ',
              html: `<div>
                      <h1>¡Gracias por su compra!</h1>
                      <h2>Código: ${newTicket.code}</h2>
                      <h2>Total: $${newTicket.amount}</h2>
                      <h3>Fecha: ${newTicket.purchase_dateTime}</h3>
                    </div>`
            })
      
            if(!!mensaje.messageId){
              console.log('Mensaje enviado', mensaje.messageId)
            }
            
            socket.emit('successTicket')
          }
          }else{
            socket.emit('failedTicket')
          }
      }catch(error){
        console.log('Error:', error) 
      }
    });

    socket.on('sendEmail', async(mailUser)=>{

      const token = generaTokenLink('http://localhost:8080/views/changePasswordView')

      const linkToken = `http://localhost:8080/views/changePasswordView?token=${token}`;

      let mensaje = await transporter.sendMail({
        from: 'ECommerce <ecommerce@gmail.com>',
        to: mailUser,
        subject: 'Recuperación de email',
        text: 'Texto email',
        html: `<div>
                <a href='${linkToken}' class='btn btn-sucess'> Cambiar contraseña </a>
              </div>`
      })

      if(!!mensaje.messageId){
        console.log('Mensaje enviado', mensaje.messageId)
      }
    })

    socket.on('changePassword', async(data)=>{
      const user = await userManager.existsUser(data.inputMail)
      
      if(data.pass1 === data.pass2){
         if(isValidPassword(user, data.pass1)){//la contra es igual a la anterior
            console.log('La nueva contraseña no puede ser igual a la anterior')
         }else{
          const newPassword = createHash(data.pass1)
          await userManager.updatePassword(data.inputMail, newPassword)
          console.log('Contraseña cambiada')
         }
      }else{
        console.log('Las contraseñas no coinciden')
      }
    })
  });
};

module.exports = funcionSocket;