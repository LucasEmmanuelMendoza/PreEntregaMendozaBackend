 const express = require('express')
 const routerLogger = express.Router()

 routerLogger.get('/', (req, res) => {
    req.logger.warning('Prueba og level warning')
 })

 module.exports = {routerLogger}