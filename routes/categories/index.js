
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const categoryClass = require('../../class/categories') 
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

router.get('/loadCategories', async (req, res) => {
    let token = req.headers.authorization
    let verify = verifyCookies(token)
    if (typeof verify === 'object') {
        let data = await categoryClass.loadCategories()
        res.status(200).json(data)
    } else {
        res.status(403).json({error:"Unauthorized Access"})
    } 
   
})





module.exports = router