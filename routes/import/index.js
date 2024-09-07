
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

const connection = require('../../class/dbConnections')

const {queryData} = require('../../class/evaluateConnection')

// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const csv = require('csvtojson');
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

router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

router.get('/importServices', async (req, res) => { 
    let data = await convertCSVtoJson('./services.csv')
    // console.log(data)
    for (let x = 0; x < data.length; x++){
        await insertServices( data[x])
    }
    await res.send(data)
})

router.get('/insertCategories', async (req, res) => { 
    let arrayData = [{
        data:[
            // 'Ads',
            // 'Hair Care',
            // 'Hair Care Product',
            // 'Operations',
            // 'Rent',
            // 'Collaterals',
            // 'Salon Item',
            // 'Ads Cosultant',
            // 'Salary',
            'Electricity',
            'Internet',
            'Nails',
            'Nail Products',
            "Miscellaneous",
            "OTC"

        ],
        table:'tbl_category_expenses_category2',
    },
    // {
    //     data:[
    //         'Goods',
    //         'Opex',
    //         'Marketing',
    //         'Labor'
    //     ],
    //     table:'tbl_category_expenses_category1'
    //     }
    ]
    

    for (var x = 0; x < arrayData.length; x++){
        let list = arrayData[x]
        for (var y = 0; y < list.data.length; y++){
            let item = list.data[y]
            // console.log(item)

            let sql = `INSERT INTO ${list.table} ( category_name  )VALUES( '${item}' )`
            console.log(sql)

            await queryData(sql)
            
        }


    }

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
