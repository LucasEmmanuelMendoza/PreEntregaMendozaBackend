const MessageManager = require('../../controller/messageManager.js')
const CartManager = require('../db/ManagerMongo/cartManager.js')
//const CartManager = require('../fileSystem/cartManager.js')
const TicketManager = require('../../dao/db/ManagerMongo/ticketManager.js')
const { v4: uuidv4  } = require('uuid');
const ProductManager = require('./ManagerMongo/productManager.js');
const { EErrors } = require('../../services/errors/errors-enum.js');
const { purchaseCartErrorInfoSP } = require('../../services/errors/messages/purchase-cart-error.message.js')
const { CustomError } = require('../../services/errors/CustomError.js')
//const ProductManger = require('../fileSystem/productManager.js')
const nodemailer = require('nodemailer');
const UserManager = require('../../controller/userManager.js');
const { isValidPassword, createHash } = require('../../utils/bcrypt.js');

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

  socket.on('updateProd', async(data) => {
    try{
      await productManager.updateProduct(data.id, data.value)
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

  socket.on('deleteProd', async(data) => {
    try{
      const prodDelete = await productManager.getProductById(data.idProd);

      console.log('data:',data)
      if(prodDelete.owner === data.user || data.user === 'adminCoder@coder.com'){
        await productManager.deleteProduct(data.idProd);
        productos = productos.filter((prod) => prod._id != data.isProd);
        console.log('Producto eliminado')
        socket.emit('productosServidor', productos);
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

  socket.on('prodToCart', (data) => { 
      (async () => {
        const prodToCart = await productManager.getProductById(data.prod)

        if(prodToCart.role === data.rol){
          console.log('No puedes agregar tus propios productos al carro')
          }else{
            await cartManager.addProduct(data.cartId, data.prod)
            console.log(`Producto ${data.prod} agregado al carro`)
          }
      })();
    })

  socket.on('addTicket', async(ticket) => {
      try{          
          const code = uuidv4(); 
          const cart = await cartManager.getCartById(ticket.cartId);
          const products = await productManager.getProducts();
  
          let newAmount = 0
          const cartPurchase = []
        
          //arreglar que se descuenten si el ticket llega con todos los datos verificados abajo
          for(prodCart of cart.products){
            for(prod of products){
                if((prodCart.product._id.toString() === prod._id.toString()) && (prodCart.quantity <= prod.stock)){
                prod.stock -= prodCart.quantity;
                await productManager.updateProduct(prod._id, prod)
                cartPurchase.push(prodCart);
                newAmount += prodCart.quantity * prodCart.product.price
                await cartManager.deleteProduct(cart._id, prodCart.product._id)
              }
            }
          };
  
          const newTicket = {
            code,
            purchase_dateTime: ticket.purchase_dateTime,
            amount: newAmount,
            purchaser: ticket.purchaser,
          }
                      
          console.log('newTicket.purchaser:',newTicket.purchaser)
          console.log('newTicket.purchaser.trim(): ', newTicket.purchaser.trim())

          if (!newTicket.purchaser || newTicket.purchaser.trim() === '' || newTicket.purchaser === '') {
            console.log('estoy acá')
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
            console.log('Ticket de compra generado con éxito')
            alert('Ticket Agregado')
          }
          }else{
            console.log('No hay productos en stock para el carrito seleccionado')
          }
      }catch(error){
        console.log('Error:', error) 
      }
    });//fin socket addTicket

    socket.on('sendEmail', async(mailUser)=>{
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth:{
            user:'mendozalucas001@gmail.com',
            pass: 'cawpeioqdpuumojh'
        },
      })

      let mensaje = await transporter.sendMail({
          from: 'ECommerce <ecommerce@gmail.com>',
          to: mailUser,
          subject: 'Recuperación de email',
          text: 'Texto email',
          html: `<div>
                  <a href='http://localhost:8080/views/changePasswordView' class='btn btn-sucess'> Cambiar contraseña </a>
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
         }
      }else{
        console.log('Las contraseñas no coinciden')
      }
    })
    
  });
};

module.exports = funcionSocket;
