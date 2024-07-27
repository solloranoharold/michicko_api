
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const classEpayment= require('../../class/epayment') 
const { verifyCookies }  = require('../verifyToken')
router.use(cors({
 origin:  process.env.api_host, // Frontend URL
  credentials: true // Allow credentials (cookies)
})); //Cross-Origin Resource Sharing (CORS)
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

router.get('/readExistingEPayment/:payment_method/:organization_id', async (req, res) => { 
  const { organization_id , payment_method } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classEpayment.readExistingEPayment( payment_method ,organization_id )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
// addUpdateEpayment
router.post('/addUpdateEpayment', async(req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classEpayment.addUpdateEPayment( req.body )
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/loadEpayments/:organization_id', async (req, res) => { 
     let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classEpayment.loadEpayments( req.params.organization_id )
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
module.exports = router