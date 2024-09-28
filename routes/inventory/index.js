
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const classInventory = require('../../class/inventory/') 
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
router.get('/loadAllInvetory/:organization_id', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classInventory.loadAllInvetory(req.params.organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/readProduct/:product/:organization_id', async (req, res) => {
    const { product , organization_id } = req.params 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classInventory.readProduct(  product , organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})
router.get('/loadDeletedInventory/:organization_id', async (req, res) => {
    const { organization_id } = req.params 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classInventory.loadDeletedInventory(  organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})
// 
router.post('/addUpdateProduct', async(req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classInventory.addUpdateProduct( req.body )
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

router.get('/loadInventory/:organization_id/:page/:itemsPerPage', async (req, res) => { 
  const {  organization_id, page, itemsPerPage } = req.params 
   let token = req.headers.authorization
      let verify = verifyCookies(token)
      if (typeof verify === 'object') {
        let data = await classInventory.loadInventory( organization_id, page, itemsPerPage)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

router.get('/getInventoryTotalCount/:organization_id/:search', async (req, res) => {
  const { organization_id ,search  } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classInventory.getInventoryTotalCount(organization_id ,search ) 
       res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})
router.get('/searchProduct/:organization_id/:search', async (req, res) => { 
  const {  organization_id , search } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classInventory.searchProduct(organization_id, search)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/productHistoryCreate', async(req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classInventory.productHistoryCreate( req.body )
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

// 
module.exports = router