const connection = require('../dbConnections')
const {pad} = require('../generateID')
module.exports = new class Inventory {
     async productHistoryCreate( data ) {
          return await insertProduct( data , 'tbl_product_history')
    }
     readProduct(product, organization_id) {
        return new Promise((resolve, reject) => { 
            let sql = `select * from tbl_products where product_name = '${product}' and organization_id = '${organization_id}'`
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })  
         })
    }
    getInventoryTotalCount( organization_id , search ){
        return new Promise((resolve , reject)=>{ 
            let  sql=`SELECT COUNT(*) AS TOTAL FROM tbl_products WHERE organization_id= '${organization_id}'`
            if (search != 'undefined') sql += ` and product_name LIKE '%${search}%'
            `
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results[0])
            })

        })
    }
    loadInventory( organization_id , page , itemsPerPage ){
        const offset = (page - 1) * itemsPerPage;
        return new Promise((resolve ,reject)=>{ 
            let  sql=`SELECT *  FROM tbl_products WHERE organization_id= '${organization_id}' 
            ORDER BY product_id LIMIT ${itemsPerPage} OFFSET ${offset }
            `

            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
    searchProduct(organization_id , search   ) {
        return new Promise((resolve, reject) => { 
            let sql = `select * from tbl_products
            WHERE product_name LIKE '%${search}%'
             AND organization_id ='${organization_id}'`
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                //  console.log(results , 'searchAccount')
                if(error) reject(error);
                resolve(results)
            })
        })
    }
      async addUpdateProduct( data ){
        console.log('/addUpdateEmployees' , data )
          if (data.method == 0) {
              //    data.product_id = generateID()
              let count = await getTotalCountForID()
              let id = count[0].TOTAL + 1
              data.product_id = pad(id, 8)
              let historyObj = { 
                   product_id: data.product_id,
                   organization_id: data.organization_id,
                   added_quantity: data.quantity,
                   current_stock: data.quantity,
                   previous_stock: 0,
                   updated_by: data.updated_by
                   
              }
              delete data.updated_by
              await insertProduct(data, 'tbl_products')
              return await this.productHistoryCreate( historyObj )
             
          } else {
         delete data.updated_by
        return await updateProduct(data)
       }
    }
    loadAllProducts(organization_id) {
        return new Promise((resolve, reject) => { 
            let sql = `Select * from tbl_products where organization_id = '${organization_id}'`
             connection.query(sql, function (error, results, fields) {
                //  console.log(results , 'searchAccount')
                if(error) reject(error);
                resolve(results)
            })
        })
    }
    
}
function getTotalCountForID() {
     return new Promise(resolve => { 
         let sql = `SELECT count(*) AS TOTAL FROM tbl_products `
         connection.query(sql, function (error, results, fields) {
            if(error) throw error
            resolve(results)
        })
     })
}
// function generateID() {
//     const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
//     const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
//     console.log(timestamp + randomStr)
//     return timestamp+randomStr
// }
function updateProduct( data ){
 delete data.method 
 return new Promise((resolve , reject )=>{ 
    let sql = `UPDATE tbl_products SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE product_id= '${data.product_id}'`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if(error) reject(error);
        if(results)
        resolve(results)
    })
 })
}

function insertProduct( data , table  ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into ${table} 
        (${columns})
        values
        (${values})
        `
        connection.query(sql, function (error, results, fields) {
            if(error) reject(error);
            resolve(results)
        })
    })
}