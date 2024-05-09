const userRegisterErrorInfoSP = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas
    Lista de propiedades requeridas:
        -> first_name: type String, recibido: ${user.first_name}
        -> last_name: type String, recibido: ${user.last_name}
        -> email: type String, recibido: ${user.email}
        -> password: type String, recibido: ${user.password}
        -> age: type Number, recibido: ${user.age}`;
}

const userRegisterErrorInfoENG = (user) => {
    return `One or more properties were sent incomplete or are not valid. 
    List of required properties: 
    -> first_name: type String, received: ${user.first_name} 
    -> last_name: type String, received: ${user.last_name} 
    -> email: type String, received: ${user.email} 
    -> password: type String, received: ${user.password} 
    -> age: type Number, received: ${user.age}`;
}

const wrongEmailRegisterErrorSP = (email) => {
    return `El email ingresado no es válido: ${email}`
}

const wrongEmailRegisterErrorENG = (email) => {
    return `The entered email is not valid: ${email}`;
}

module.exports = { userRegisterErrorInfoENG, userRegisterErrorInfoSP, wrongEmailRegisterErrorENG, wrongEmailRegisterErrorSP }