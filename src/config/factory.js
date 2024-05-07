const config = require('../config/config.js')
let pathProductManager;

switch(config.persistence){
    case "MONGO":
        pathProductManager = __dirname + '../dao/db/ManagerMongo/productManager.js';
    break;

    case "FILE":
        pathProductManager = __dirname + '../dao/fileSystem/productManager.js';
    break;
}

module.exports = pathProductManager 