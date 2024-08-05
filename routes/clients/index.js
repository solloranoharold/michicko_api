require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

const Clients = require('../../class/clients/')
const {verifyCookies} = require( '../verifyToken')
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

router.get('/' , (req,res)=>{ 
    res.send('HELLO CLIENTS')
})


router.post('/addUpdateClient' ,async(req,res)=>{
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Clients.addUpdateClient( req.body ) 
      res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})
router.get('/loadAllClients/:organization_id', async (req, res) => { 
   let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Clients.loadAllClients( req.params.organization_id  ) 
       res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})
router.get('/readExistingClient/:last_name/:first_name/:organization_id' , async(req,res)=>{ 
  const { last_name , first_name , organization_id } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Clients.readExistingClients( last_name , first_name , organization_id  ) 
       res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})

router.get('/clientTotalCount/:organization_id/:search', async (req, res) => {
  const {  organization_id ,search  } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Clients.getClientTotalCount(  organization_id ,search ) 
       res.send(data)
  } else {
    res.status(403).json({error:"Unauthorized Access"})
  }
})

router.get('/loadClients/:organization_id/:page/:itemsPerPage', async (req, res) => { 
  const {  organization_id, page, itemsPerPage } = req.params 
   let token = req.headers.authorization
      let verify = verifyCookies(token)
      if (typeof verify === 'object') {
        let data = await Clients.loadClients( organization_id, page, itemsPerPage)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})

// 

router.get('/searchClient/:organization_id/:search', async (req, res) => { 
  const {  organization_id , search } = req.params 
  let token = req.headers.authorization
  let verify = verifyCookies(token)
  if (typeof verify === 'object') {
        let data = await Clients.searchClient(organization_id, search)
        // console.log(data ,'loadEmployees' )
        res.send(data)
      } else {
        res.status(403).json({error:"Unauthorized Access"})
      }
})




module.exports = router