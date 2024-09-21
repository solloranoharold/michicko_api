
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

const sql_connection = require('../../class/dbConnections')

// const {queryData} = require('../../class/evaluateConnection')

// const fs = require('fs-extra')
// const moment = require('moment')
// const connection = require('./dbConnections')
const csv = require('csvtojson');
const ExcelJS = require('exceljs');

const mysql = require('mysql2/promise')
let connection;
async function getConnection() {
  if (!connection || connection.end) {
    connection = await mysql.createConnection({
      host: 'bd3bl6vigzn6awaepqc3-mysql.services.clever-cloud.com',
      user: 'ucdxkv4iqr8jh0ev',
      password: 'm8BSFehKKIEFM5ku1r19',
      database: 'bd3bl6vigzn6awaepqc3'
    });
  }
  return connection;
}



async function queryData(sql) {
     let conn;
    try {
        conn = await getConnection();
        
        const [result] = await conn.query(sql);

        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        if (conn) {
        await conn.end(); // Explicitly close the connection if required
        }
    }
}
async function getTotalCountForID() {
    //  return new Promise(resolve => { 
    let sql = `SELECT count(*) AS TOTAL FROM tbl_services `
    return await queryData(sql)
    //      connection.query(sql, function (error, results, fields) {
    //         if(error) throw error
    //         resolve(results)
    //     })
    //  })
}
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

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

router.get('/categories', async (req, res) => { 
    const workbook = new ExcelJS.Workbook();
    let sql = `select * from tbl_category`
    console.log(sql)
    let results = await queryData(sql)
    const worksheet1 = workbook.addWorksheet('Categories');
     worksheet1.columns = [
        { header: 'Category', key: 'category_id', width: 15, style: { alignment: { horizontal: 'center' } } },
        { header: 'Category Name', key: 'category_name', width: 30, style: { alignment: { horizontal: 'left' } } },
        
    ];
     
    for (var x = 0; x < results.length; x++){
        worksheet1.addRow(results[x]);
    }
    let buffer = await workbook.xlsx.writeBuffer()
     res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename=categories.xlsx`,
    'Content-Length': buffer.length
        });
    res.send(buffer)
    // await res.send(results)
})

router.get('/importServices', async (req, res) => { 
    let data = await convertCSVtoJson('./services.csv')
   
    for (let x = 0; x < data.length; x++){
        // console.log(data[x])
        let count = await getTotalCountForID()
        let id = count[0].TOTAL + 1
        data[x].service_id =  pad(id, 8)
         console.log(data[x])
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



 async function insertServices(obj) {
        const columns = Object.keys(obj).join(', ');
        const values = Object.values(obj).map(value => sql_connection.escape(value)).join(', ');
        let sql = `insert into tbl_services 
        (${columns})
        values
        (${values})
        `
     console.log(sql)
     console.log(obj)
        // return await queryData(sql)
}



module.exports = router
