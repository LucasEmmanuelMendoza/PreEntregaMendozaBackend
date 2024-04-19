const { jwt } = require('jsonwebtoken');

const SECRET_KEY = "coderSecret2";

const generaToken = (usuario) => {
    const dataUser = {
        id:usuario._id,
        name: usuario.name,
        lastName: usuario.lastName
    }
    const token = jwt.sign(dataUser, SECRET_KEY, {expiresIn: '10min'})
    return token
}

const validaToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { generaToken, validaToken }