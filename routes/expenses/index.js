
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const classExpenses= require('../../class/expenses') 
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


router.get('/readCategory1/:organization_id', async (req, res) => { 
    const { organization_id } = req.params 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classExpenses.readCategory1( organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/readCategory2/:organization_id', async (req, res) => { 
    const { organization_id } = req.params 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classExpenses.readCategory2( organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

module.exports = router