const connection = require('../dbConnections')
const moment = require('moment')
const { pad } = require('../generateID')
const {queryData } = require('../evaluateConnection')
module.exports = new class Inventory {
    
    async productHistoryCreate( data ) {
          return await insertProduct( data , 'tbl_inventory_history')
    }
    async loadDeletedInventory(organization_id) {
         let sql = `select * from tbl_inventory where  organization_id = '${organization_id}' and deleted_date IS NOT NULL`
            return await queryData(sql) 
    }

     async readProduct(product, organization_id) {
        // return new Promise((resolve, reject) => { 
            let sql = `select * from tbl_inventory where product_name = '${product}' and organization_id = '${organization_id}'`
            return await queryData(sql)
         //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         resolve(results)
        //     })  
        //  })
    }
    async getInventoryTotalCount( organization_id , search ){
        // return new Promise((resolve , reject)=>{ 
            let  sql=`SELECT COUNT(*) AS TOTAL FROM tbl_inventory WHERE organization_id= '${organization_id}' and deleted_date IS NULL`
        if (search != 'undefined') sql += ` and product_name LIKE '%${search}%'`
        let results =  await queryData(sql)
        return await Promise.resolve(results[0])
        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         if(results)
        //         resolve(results[0])
        //     })

        // })
    }
    async loadInventory( organization_id , page , itemsPerPage ){
        const offset = (page - 1) * itemsPerPage;
        // return new Promise((resolve ,reject)=>{ 
        let sql = `SELECT *  FROM tbl_inventory WHERE organization_id= '${organization_id}'
            and deleted_date IS NULL 
            ORDER BY inventory_id LIMIT ${itemsPerPage} OFFSET ${offset }
            `

        console.log(sql)
        let results = await queryData(sql)
        results.forEach(item => {
            item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
            item.updated_date = moment(item.updated_date).format('YYYY-MM-DD HH:mm:ss A')
        });
        return Promise.resolve(results)
            // connection.query(sql, function (error, results, fields) {
            //     if(error) reject(error);
            //     if (results)
            //     results.forEach(item => {
            //         item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
            //         item.updated_date = moment(item.updated_date).format('YYYY-MM-DD HH:mm:ss A')
            //     });
            //     resolve(results)
            // })
        // })
    }
    async searchProduct(organization_id , search   ) {
        // return new Promise((resolve, reject) => { 
            let sql = `select * from tbl_inventory
            WHERE product_name LIKE '%${search}%'
             AND organization_id ='${organization_id}' 
             AND deleted_date IS NULL
             `
        console.log(sql)
        return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }
      async addUpdateProduct( data ){
        console.log('/addUpdateEmployees' , data )
          if (data.method == 0) {
              //    data.inventory_id = generateID()
              let count =await getTotalCountForID()
              let id = count[0].TOTAL + 1 
              data.inventory_id = pad(id, 8)
               let historyObj = { 
                   inventory_id: data.inventory_id,
                   organization_id: data.organization_id,
                   added_quantity: data.quantity,
                   current_stock: data.quantity,
                   previous_stock: 0,
                   updated_by: data.updated_by
                   
              }
              delete data.updated_by
              await insertProduct(data, 'tbl_inventory')
             return await this.productHistoryCreate( historyObj )
              
          } else {
              delete data.updated_by
              data.date_created = moment(data.date_created).format('YYYY-MM-DD HH:mm:ss')
                return await updateProduct(data)
            }
    }
    async loadAllInvetory(organization_id) {
        // return new Promise((resolve, reject) => { 
            let sql = `select * from tbl_inventory
            WHERE organization_id ='${organization_id}' AND deleted_date IS NULL`
        console.log(sql)
        return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }
    
}
async function getTotalCountForID() {
    //  return new Promise(resolve => { 
    let sql = `SELECT count(*) AS TOTAL FROM tbl_inventory `
    return await queryData(sql)
    //      connection.query(sql, function (error, results, fields) {
    //         if(error) throw error
    //         resolve(results)
    //     })
    //  })
}
// function  generateID() {
//     const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
//     const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
//     console.log(timestamp + randomStr)
//     return timestamp+randomStr
// }
async function updateProduct( data ){
 delete data.method 
//  return new Promise((resolve , reject )=>{ 
    let sql = `UPDATE tbl_inventory SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE inventory_id= '${data.inventory_id}'`
    console.log(sql)
    return await queryData(sql)
//     connection.query(sql, function (error, results, fields) {
//         if(error) reject(error);
//         if(results)
//         resolve(results)
//     })
//  })
}

async function insertProduct( data , table  ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into ${table}
        (${columns})
        values
        (${values})
        `
    return await queryData(sql)
    //     connection.query(sql, function (error, results, fields) {
    //         if(error) reject(error);
    //         resolve(results)
    //     })
    // })
}