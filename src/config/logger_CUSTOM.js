/* const winston = require('winston')
const config = require('../config/config.js')

const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:'red',
        error:'yellow',
        warning:'magenta',
        info:'cyan',
        http:'blue',
        debug:'grey'
    }
}

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports : [
        new winston.transports.Console({
            level: 'debug', 
            format: winston.format.simple()
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports : [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'info',
            format: winston.format.simple()
        })
    ]
})

const addLogger = (req, res, next) => {
    if(config.environment === 'prod'){
        req.logger = prodLogger
        req.logger.info(`Prueba prod info en ${req.url} - metodo: ${req.method}`)
        req.logger.warning(`Prueba prod warning en ${req.url} - metodo: ${req.method}`)
        req.logger.error(`Prueba prod error en ${req.url} - metodo: ${req.method}`)
        req.logger.fatal(`Prueba prod fatal en ${req.url} - metodo: ${req.method}`)
    }else{
        req.logger = devLogger
        req.logger.debug(`Prueba dev debug en ${req.url} - metodo: ${req.method}`)
        req.logger.http(`Prueba dev http en ${req.url} - metodo: ${req.method}`)
        req.logger.info(`Prueba dev info en ${req.url} - metodo: ${req.method}`)
        req.logger.warning(`Prueba dev warning en ${req.url} - metodo: ${req.method}`)
        req.logger.error(`Prueba dev error en ${req.url} - metodo: ${req.method}`)
        req.logger.fatal(`Prueba dev fatal en ${req.url} - metodo: ${req.method}`)
    }
    next()
}

module.exports = addLogger 
 */