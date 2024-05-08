const purchaseCartErrorInfoSP = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas
    Lista de propiedades requeridas:
        -> first_name: type String, recibido: ${user.first_name}
        -> email: type String, recibido: ${user.email}`;
}

const purchaseCartErrorInfoENG = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas
    Lista de propiedades requeridas:
        -> first_name: type String, recibido: ${user.first_name}
        -> email: type String, recibido: ${user.email}`;
}