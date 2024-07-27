
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const classServices = require('../../class/services') 
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


router.get('/readExistingService/:service/:organization_id', async (req, res) => {
    const { service , organization_id } = req.params 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classServices.readServices(  service , organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})

router.post('/addUpdateService', async(req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await classServices.addUpdateService( req.body )
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

router.get('/loadServices/:organization_id/:page/:itemsPerPage', async (req, res) => { 
  const { organization_id, page, itemsPerPage } = req.params 
   let token = req.headers.authorization
      let verify = verifyCookies(token)
      if (typeof verify === 'object') {
        let data = await classServices.loadServices(organization_id, page, itemsPerPage)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

router.get('/getServicesTotalCount/:organization_id/:search', async (req, res) => {
  const { organization_id ,search  } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classServices.getServicesTotalCount(organization_id ,search ) 
       res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})
router.get('/searchServices/:organization_id/:search', async (req, res) => { 
  const {   organization_id , search } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classServices.searchServices( organization_id, search)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

router.get('/loadAllServices/:organization_id', async (req, res) => { 
    let token = req.headers.authorization
  let verify = verifyCookies(token)
   if (typeof verify === 'object') {
      let data = await classServices.loadAllServices( req.params.organization_id)
      // console.log(data ,'loadEmployees' )
      res.send(data)
    } else {
      res.status(403).json({error:"Unauthorized Access"})
    }
})
module.exports = router