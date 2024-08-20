
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const classTransaction= require('../../class/transactions') 
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
//LOAD TRANSACTION 
router.get('/loadTransactionData/:organization_id/:date1/:date2', async (req, res) => { 
  const { organization_id , date1 , date2 } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadTransactionData(organization_id , date1 , date2 )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadAllCommissions/:organization_id/:date1/:date2', async (req, res) => { 
  const { organization_id , date1 , date2 } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadAllCommissions(organization_id , date1 , date2 )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadEmployeesCommission/:organization_id/:date1/:date2', async (req, res) => { 
  const { organization_id , date1 , date2 } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadAllEmployeesCommission(organization_id , date1 , date2 )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
// INSERTING TRANSACTION
router.post('/createTransactions', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.createTransactions(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/createTransactionsServices', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.createTransactionsServices(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/createTransactionsServicesProducts', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.createTransactionsServicesProducts(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/createTransactionsOTCProducts', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.createTransactionsOTCProducts(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/createTransactionsCommissions', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.createTransactionsCommissions(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/getAffectedServicesProduct', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.getAffectedServicesProduct(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

router.post('/evaluateAffectedOTCProduct', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.evaluateAffectedOTCProduct(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadNotifications/:organization_id', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadNotifications(req.params.organization_id)
      console.log(data,'loadNotifications' )   
    res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.post('/updateNotification', async (req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.updateNotification(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadCommissions/:organization_id/:employee_id/:date1/:date2', async (req, res) => { 
  const { organization_id,employee_id , date1 , date2} = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadCommissions(organization_id,employee_id , date1 , date2 )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/getClientTransactions/:organization_id/:client_id/:date1/:date2', async (req, res) => { 
  const { organization_id, client_id , date1 , date2} = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.getClientTransactions(organization_id,client_id , date1 , date2 )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadAllTransactionsPerPage/:organization_id/:page/:itemsPerPage', async (req, res) => { 
  const { organization_id ,page , itemsPerPage} = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadAllTransactionsPerPage(organization_id,page,itemsPerPage )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
router.get('/loadAllServicesSalesPerPage/:organization_id/:page/:itemsPerPage', async (req, res) => { 
  const { organization_id ,page , itemsPerPage} = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadAllServicesSalesPerPage(organization_id,page,itemsPerPage )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
// 
router.post('/updateHistoryTransactions', async (req, res) => { 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.updateHistoryTransactions(req.body)
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})


router.get('/loadTransactionCount/:organization_id/:search', async (req, res) => { 
  const { organization_id , search }= req.params 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.loadTransactionCount(organization_id , search )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
// searchTransaction
router.get('/searchTransaction/:organization_id/:search', async (req, res) => { 
  const { organization_id , search }= req.params 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await classTransaction.searchTransaction(organization_id , search )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
module.exports = router