
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const csv = require('csvtojson');
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

router.get('/importServices', async (req, res) => { 
    let data = await convertCSVtoJson('./services.csv')
    // console.log(data)
    for (let x = 0; x < data.length; x++){
        await insertServices( data[x])
    }
    await res.send(data)
})

function convertCSVtoJson( csvFilePath ) {
    return new Promise(resolve => { 
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            // console.log(jsonObj);
            resolve(jsonObj)
            // Process your JSON data further as needed
        })
        .catch((err) => {
            console.error(err);
        });
    })
}


const connection = require('../../class/dbConnections')
 function insertServices(obj) {
     return new Promise((resolve, reject) => { 
        const columns = Object.keys(obj).join(', ');
        const values = Object.values(obj).map(value => connection.escape(value)).join(', ');
        let sql = `insert into tbl_services 
        (${columns})
        values
        (${values})
        `
         console.log(sql)
           connection.query(sql, function (error, results, fields) {
            if(error) reject(error);
            resolve(results)
        })
        // resolve(obj)
    })
}



module.exports = router
