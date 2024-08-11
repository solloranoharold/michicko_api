const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const employeeClass = require('../../class/employees') 
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



router.get('/readExistingEmployee/:last_name/:first_name/:organization_id' ,async(req,res)=>{ 
    let { last_name , first_name, organization_id    } = req.params 
    let data = await employeeClass.readExistingEmployees(last_name , first_name , organization_id    )
    res.send(data)
})

// router.get('/' , (req,res)=>{ 
//     res.send('HELLO EMPLOYEES')
// })

router.post('/addUpdateEmployees', async (req, res) => { 
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
      let data = await employeeClass.addUpdateEmployees( req.body )
      res.send(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 

})
router.get('/employeeTotalCount/:employee_id/:organization_id/:search' , async(req,res )=>{
    const {employee_id,  organization_id  , search }  = req.params
    let data = await employeeClass.readEmployeeTotalCount(employee_id, organization_id , search )
    // console.log(data ,'employeeTotalCount' )
    res.send(data)
})

router.get('/loadEmployees/:employee_id/:organization_id/:page/:itemsPerPage' , async(req , res)=>{
    const { employee_id , organization_id , page , itemsPerPage} = req.params 
    let data = await employeeClass.loadEmployees( employee_id , organization_id , page , itemsPerPage)
    // console.log(data ,'loadEmployees' )
    res.send(data)
})

router.get('/loadEmployeesOption/:organization_id' , async(req , res)=>{
    const {   organization_id } = req.params 
    let data = await employeeClass.loadEmployeesOption(  organization_id )
    // console.log(data ,'loadEmployees' )
    res.send(data)
})

router.get('/searchEmployee/:organization_id/:search' , async(req , res)=>{
    const {   organization_id , search } = req.params 
    let data = await employeeClass.searchEmployees(  organization_id , search )
    // console.log(data ,'loadEmployees' )
    res.send(data)
})

router.get('/', (req, res) => { 
  res.send('sdadasdasdas')
})



module.exports = router