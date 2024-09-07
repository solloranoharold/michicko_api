const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const discountClass = require('../../class/discounts') 
const { verifyCookies }  = require('../verifyToken')
router.use(cors({
 origin:  process.env.api_host, // Frontend URL
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); //Cross-Origin Resource Sharing (CORS)
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);




router.get('/readExistingDiscount/:description/:organization_id', async (req, res) => { 
    let token = req.headers.authorization
    const  { description , organization_id  }= req.params 
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await discountClass.readExistingDiscount( description , organization_id )
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 

})

router.post('/addUpdateDiscounts', async (req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await discountClass.addUpdateDiscounts( req.body  )
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

router.get('/readDiscounts/:organization_id', async (req, res) => { 
    let token = req.headers.authorization
    const  { organization_id  } = req.params 
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await discountClass.readDiscounts( organization_id )
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 

})

router.get('/', (req, res) => { 
  res.send('sdadasdasdas')
})



module.exports = router