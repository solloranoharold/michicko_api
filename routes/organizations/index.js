
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const organizationClass = require('../../class/organizations') 
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

router.get('/readOrganizations', async (req, res) => {
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.readOrganizations()
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})

router.get('/readOrganizationsPerID/:organization_id', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.readOrganizationsPerID(req.params.organization_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.post('/addUpdateOrganizations', async (req, res) => { 
   let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.addUpdateOrganizations(req.body)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/readExistingOrganization/:organization', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.readExistingOrganization(req.params.organization)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})

// 
router.get('/readOrganizationsAdmin/:employee_id', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.readOrganizationsAdmin(req.params.employee_id)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/searchOrganization/:employee_id/:search', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.searchOrganization(req.params.employee_id ,req.params.search)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
router.get('/organizationsTotalCount/:employee_id/:search', async (req, res) => { 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await organizationClass.organizationsTotalCount(req.params.employee_id , req.params.search)
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
})
// organizationsTotalCount




module.exports = router