require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const axios = require('axios')
const jwt = require('jsonwebtoken')
const mySecretKey = process.env.SECRET_KEY
const Accounts = require('../../class/accounts')
const { verifyCookies } = require('../verifyToken')
// const cookieParser = require('cookie-parser')

// router.use(cookieParser())
router.use(cors({
 origin:  process.env.api_host, // Frontend URL
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); //Cross-Origin Resource Sharing (CORS)


router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get('/', async (req, res) => { 
    res.send('HELLO ACCOUNTS')
})


router.post('/login' , async(req,res)=>{ 
    // console.log('/login' , req.params)
    let { username , password } = req.body 
    let data = await Accounts.loginUsers(username, password)
    console.log(data)
    if (data.length == 0 ) 
      res.send({  error: "USERNAME AND PASSWORD NOT MATCHED" })
    else {
       let user = JSON.parse(JSON.stringify(data[0]))
      let token = jwt.sign( user, mySecretKey ,{ expiresIn:'7d'})
      user.token = token 
      res.send(user)
      
    }
   
    // res.redirect(`/adminDashboard`)
})

router.get('/readExistingAccount/:username', async(req, res) => { 
  let token = req.headers.authorization
  let { username } = req.params 
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
    let data = await Accounts.readExistingAccount(username) 
    res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})

router.post('/addUpdateAccount', async(req, res) => { 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
    let data = await Accounts.addUpdateAccount(req.body)
    res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})
router.post('/updateSessionAccountStatus', async(req, res) => { 
    let data = await Accounts.updateSessionAccountStatus(req.body)
    res.send(data)
})
// 
router.get('/accountTotalCount/:position/:organization_id/:search', async(req, res) => { 
  const { position , organization_id , search}  = req.params
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
    let data = await Accounts.accountTotalCount( position , organization_id , search)
    // console.log(data ,'accountTotalCount' )
     res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
}) 
router.get('/loadAccounts/:position/:organization_id/:page/:itemsPerPage' , async(req , res)=>{
    const { position , organization_id , page , itemsPerPage} = req.params 
     let token = req.headers.authorization
      let verify = verifyCookies(token)
      if (typeof verify === 'object') {
        let data = await Accounts.loadAccounts(position, organization_id, page, itemsPerPage)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
    
    
})
router.get('/searchAccount/:position/:organization_id/:search', async (req, res) => { 
  const { position , organization_id , search } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Accounts.searchAccount(position, organization_id, search)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

// 

router.post('/updateAccountPassword', async(req, res) => { 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Accounts.updateAccountPassword(req.body)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

router.post('/resetAccountPassword', async(req, res) => { 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Accounts.resetAccountPassword(req.body)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
// 
router.get('/evaluateAccountStatus/:organization_id/:status', async (req, res) => { 
  const {  organization_id , status } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Accounts.evaluateAccountStatus( organization_id, status)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})
module.exports = router