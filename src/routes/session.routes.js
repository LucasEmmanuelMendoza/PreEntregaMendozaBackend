const express = require('express')
const routerSession = express.Router();

routerSession.get('/current', (req, res)=>{
    res.send(req.session.passport)
})

module.exports = { routerSession }