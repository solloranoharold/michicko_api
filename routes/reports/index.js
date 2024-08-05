
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require('fs-extra')
const moment = require('moment')
// const connection = require('./dbConnections')
const classReports = require('../../class/reports') 
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


router.post('/generateInventoryReports', async (req, res) => {
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
       let buffer = await classReports.generateInventoryReports(req.body)
         res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${req.body.filename}`,
        'Content-Length': buffer.length
         });
        res.send(buffer)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})
router.post('/generateDailySummaryReports', async (req, res) => {
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
       let buffer = await classReports.generateDailySummaryReports(req.body)
         res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${req.body.filename}`,
        'Content-Length': buffer.length
         });
        res.send(buffer)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})
// 
router.get('/generateDashBoardCards/:organization_id/:date1/:date2', async (req, res) => {
  const  { organization_id , date1, date2 } = req.params 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await classReports.generateDashBoardCards(organization_id, date1, date2)
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})
router.get('/generateYearlyActualNet/:organization_id', async (req, res) => {
  const  { organization_id} = req.params 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await classReports.generateYearlyActualNet(organization_id)
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
    
})
router.get('/generateYearServiceSales/:organization_id', async (req, res) => {
  const  { organization_id} = req.params 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await classReports.generateYearServiceSales(organization_id)
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
    
})
router.get('/generateYearOTCSales/:organization_id', async (req, res) => {
  const  { organization_id} = req.params 
  let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await classReports.generateYearOTCSales(organization_id)
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
    
})
// generateYearOTCSales

module.exports = router