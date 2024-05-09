const userLoginErrorInfoSP = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas
    Lista de propiedades requeridas:
        -> first_name: type String, recibido: ${user.first_name}
        -> email: type String, recibido: ${user.email}`;
}

const userLoginErrorInfoENG = (user) => {
    return `One or more properties were sent incomplete or are not valid.
    List of required properties:
    -> first_name: type String, received: ${user.first_name}
    -> email: type String, received: ${user.email}`;
}

module.exports = { userLoginErrorInfoSP, userLoginErrorInfoENG }