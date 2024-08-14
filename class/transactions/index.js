const connection = require('../dbConnections')
const moment = require('moment')
module.exports = new class Transaction { 
 
    searchTransaction( organization_id , search   ) {
        return new Promise((resolve, reject) => { 
            let sql = `SELECT A.* FROM tbl_transactions A 
            WHERE A.transaction_id LIKE '%${search}%' AND A.organization_id ='${organization_id}'`
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                //  console.log(results , 'searchAccount')
                if(error) reject(error);
                resolve(results)
            })
        })
    }
    loadTransactionData(organization_id, date1, date2) {
        date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
        date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
         return new Promise(resolve => {
            
             let sql = `
             SELECT * FROM tbl_transactions where organization_id = '${organization_id}'
            and transaction_created_date BETWEEN '${date1}' and '${date2}'
             `
             console.log(sql)
              connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    loadAllEmployeesCommission( organization_id , date1 , date2 ) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')

            let sql = `
                SELECT 
                CONCAT(B.last_name , ' ' ,B.first_name) as 'fullname',
                B.position , 
                SUM(A.commission_total_amount) as 'total_commission',
                SUM(A.tip) as 'total_tip'

                FROM tbl_transactions_commisions A 
                inner join tbl_employees B on A.employee_id = B.employee_id
                WHERE A.organization_id = '${organization_id}'
                and A.date_created BETWEEN '${date1}' and '${date2}'
                and A.status = 1 
                GROUP BY A.employee_id
            `
            console.log(sql , ' loadAllEmployeesCommission')
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    loadAllCommissions(organization_id, date1, date2) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `
            SELECT A.employee_id , B.last_name ,B.first_name , B.middle_name,  Sum(A.commission_total_amount) as 'commissions',Sum(A.tip) AS 'tip'   FROM tbl_transactions_commisions A
            inner join tbl_employees B on A.employee_id = B.employee_id
            where A.organization_id = '${organization_id}'
            and A.date_created BETWEEN '${date1}' and '${date2}'
            and A.status = 1 
            GROUP BY A.employee_id
            ORDER BY commissions DESC
            `
            console.log(sql ,'loadAllCommissions')
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    
    async createTransactions(data) {     
        return await insertTransactions( data ,'tbl_transactions' )
    }

  


    async createTransactionsServices(data) {
        return await this.evaluateTransactions( data , 'tbl_transactions_services')
    }
    async createTransactionsServicesProducts(data) {
         return await this.evaluateTransactions( data , 'tbl_transactions_services_product')
    }
    async createTransactionsOTCProducts(data) {
         return await this.evaluateTransactions( data , 'tbl_transactions_otc_product')
    }
    async createTransactionsCommissions(data) {
         return await this.evaluateTransactions( data , 'tbl_transactions_commisions')
    }
    async  evaluateTransactions(data, table) {
        for (let x = 0; x < data.length; x++){
            await insertTransactions(data[x] , table )
        }
        return await data 
    }
   

    async getAffectedServicesProduct( data ) {
         let promises = []
        for (let x = 0; x < data.length; x++){
            let item = await readAffectedServicesProduct(data[x])
            console.log(item, 'getAffectedServicesProduct')
            if (data[x]?.status == 0) {
                item[0].total_value = parseFloat(item[0].total_value + data[x].less_quantity) 
                item[0].quantity =  parseFloat(item[0].total_value / item[0].net_value)
            } else {
                data[x].previous_stock = item[0].quantity
                item[0].total_value = parseFloat(item[0].total_value - data[x].less_quantity) 
                item[0].quantity = parseFloat(item[0].total_value / item[0].net_value)
                data[x].current_stock = item[0].quantity
            }
            
            item[0].date_created = moment(item[0].date_created).format('YYYY-MM-DD HH:mm:ss')
            item[0].updated_date = moment().format('YYYY-MM-DD HH:mm:ss')
            if (parseInt(item[0].quantity) <= 5) await this.createNotification(item[0] ,'/inventory')
            await this.evaluateTransactionsUpdate(item, 'inventory_id', 'tbl_inventory')
            promises = item
            console.log(promises , ' getAffectedServicesProduct ')
        }
        await this.evaluateTransactionsUpdate(data , 'transaction_id' , 'tbl_transactions_services_product' )
        return  await promises  
      
    }


    // 
    async evaluateAffectedOTCProduct( data ) {
            let promises = []
            for (let x = 0; x < data.length; x++){
                let item = await readAffectedOTCProduct(data[x])
                 console.log(item ,'evaluateAffectedOTCProduct' )
                if (data[x]?.status == 0) {
                    item[0].quantity = parseInt(item[0].quantity + data[x].less_quantity) 
                } else {
                    data[x].previous_stock = item[0].quantity
                    item[0].quantity = parseInt(item[0].quantity - data[x].less_quantity) 
                    item[0].date_created = moment(item[0].date_created).format('YYYY-MM-DD HH:mm:ss')
                    data[x].current_stock = item[0].quantity
                }
                
                if (parseInt(item[0].quantity) <= 5) await this.createNotification(item[0]  ,'/products')
                await this.evaluateTransactionsUpdate(item, 'product_id', 'tbl_products')
                promises = item
              
                // console.log(promises , ' getAffectedServicesProduct ')
        }
        await this.evaluateTransactionsUpdate(data , 'transaction_id' , 'tbl_transactions_otc_product' )
            return  await promises  
        
    }
     async evaluateTransactionsUpdate( data ,key , table  ) {
         for (let x = 0; x < data.length; x++){
             let date = data[x].date_created ? 'date_created' : data[x].created_date ? 'created_date' : ""
             if(date) data[x][date] = moment( data[x][date]).format('YYYY-MM-DD HH:mm:ss')
            await updateTransaction(data[x] ,key, table )
        }
        return await data 
    }
    async createNotification( data , path ){ 
        let obj = { 
            notification_id: generateID(),
            path: path,
            message: `${data.inventory_id ? 'Service': 'OTC'} Product ${data.product_name} has  ${data.quantity}${data.unit? data.unit: ' quantity'} left please restock`,
            organization_id: data.organization_id
        }
        return await insertTransactions( obj  ,'tbl_notifications' )
    }
    async updateNotification( data ) {
        return await updateTransaction(data ,'notification_id' , 'tbl_notifications')
    }
     loadNotifications(organization_id) {
         return new Promise(resolve => { 
             let sql = `select A.*,B.* from tbl_notifications A 
              inner join tbl_organizations B on A.organization_id = B.organization_id
              where A.created_date BETWEEN '${moment().format('YYYY-MM-01 00:00:00')}' and '${moment().format('YYYY-MM-31 23:59:59')}'
              `
             if(organization_id!=0) sql+=` and A.organization_id = '${organization_id}'`
             sql += ` ORDER BY  A.created_date DESC`
             console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results )
                resolve(results)
            })
        })
    }

    loadCommissions( organization_id,employee_id , date1 , date2) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select * from tbl_transactions_commisions where organization_id = '${organization_id}'
            and employee_id = '${employee_id}' 
            and date_created between '${date1}' and '${date2}'
             and status = 1 
            `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                results.forEach(item => {
                    item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
       })
    }
    async getClientTransactions(organization_id, client_id, date1, date2) {
       let transactions = await this.loadClientTransactions(organization_id, client_id, date1, date2)
       let services = await this.loadClientServices(organization_id, client_id, date1, date2)
       let products = await this.loadClientProducts(organization_id, client_id, date1, date2)
       return await transactions.concat(services).concat(products)
    }
     loadClientServices( organization_id,client_id , date1 , date2) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select A.*,B.* from tbl_transactions_services A 
            inner join tbl_services B on A.service_id = B.service_id
            where A.organization_id = '${organization_id}'
            and A.client_id = '${client_id}' 
            and A.created_date between '${date1}' and '${date2}'
             and A.status = 1 
            `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                results.forEach(item => {
                    item.created_date = moment(item.created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
       })
    }
     loadClientProducts( organization_id,client_id , date1 , date2) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select A.*,B.* from tbl_transactions_otc_product A 
            inner join tbl_products B on A.product_id = B.product_id
            where A.organization_id = '${organization_id}' 
            and client_id = '${client_id}'
            and A.date_created between '${date1}' and '${date2}'
             and A.status = 1 
            `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                results.forEach(item => {
                    item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
        }) 
    }
    loadClientTransactions( organization_id,client_id , date1 , date2) {
        return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select  A.* from tbl_transactions A
            where A.organization_id = '${organization_id}' 
            and A.client_id = '${client_id}'
            and A.transaction_created_date between '${date1}' and '${date2}'
            and A.status = 1 
            `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                results.forEach(item => {
                    item.transaction_created_date = moment(item.transaction_created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
       })
    }
    loadTransactionCount(organization_id , search) { 
        return new Promise(resolve => { 
            let sql = `select Count(*) as TOTAL from tbl_transactions where organization_id = '${organization_id}'`
            if (search != 'undefined') sql += ` and transaction_id LIKE '%${search}%'`
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                if(results)
                resolve(results[0])
            })
        })
    }
    loadAllTransactionsPerPage(organization_id, page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return new Promise((resolve) => {
            let sql = `select  A.*,B.*,C.last_name AS 'emp_last' ,C.first_name AS 'emp_first' from tbl_transactions A 
            inner join tbl_clients B on A.client_id = B.client_id
            left join tbl_employees C on A.updated_by= C.employee_id
            where A.organization_id = '${organization_id}' 
            ORDER BY A.transaction_created_date DESC
            LIMIT ${itemsPerPage} OFFSET ${offset}
            
            `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                results.forEach(item => {
                    item.transaction_created_date = moment(item.transaction_created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
        })
    }
    loadAllTransactionsPerDate(organization_id, date1, date2) {
        console.log(organization_id, date1, date2)
        return new Promise((resolve) => {
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select  A.*,B.organization_name,C.last_name , C.first_name from tbl_transactions A 
            inner join tbl_organizations B on A.organization_id = B.organization_id
            inner join tbl_employees C on A.updated_by = C.employee_id
            where A.organization_id = '${organization_id}' 
            and A.transaction_created_date between '${date1}' and '${date2}'
            ORDER BY A.transaction_created_date ASC
            `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.transaction_created_date = moment(item.transaction_created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
        })
    }
 

    //   FOR UPDATING TRANSACTIONS
    async updateHistoryTransactions(data) {    
        console.log(data, 'updateHistoryTransactions ')
        await updateTransaction(data, 'transaction_id', 'tbl_transactions') 
        let services_products = await this.loadAllServicesProductsTransaction(data.transaction_id)
        let otc_products = await this.loadAllOTCProductsTransaction(data.transaction_id) 
        let services = await this.loadAllServicesTransaction(data.transaction_id)
        let commissions = await this.loadAllCommissionsTransaction(data.transaction_id)
        await services_products.forEach(item => item.status = data.status )
        await otc_products.forEach(item =>  item.status = data.status )
        await services.forEach(item => item.status = data.status )
        await commissions.forEach(item =>  item.status = data.status  )
        await this.evaluateTransactionsUpdate(services_products,'transaction_id', 'tbl_transactions_services_product')
        await this.evaluateTransactionsUpdate(otc_products,'transaction_id', 'tbl_transactions_otc_product')
        await this.evaluateTransactionsUpdate(services,'transaction_id', 'tbl_transactions_services')
        await this.evaluateTransactionsUpdate( commissions ,'transaction_id', 'tbl_transactions_commisions')
        
        await this.getAffectedServicesProduct(services_products)
        await this.evaluateAffectedOTCProduct( otc_products)
        return await data
        
    }
    loadAllServicesProductsTransaction(transaction_id) {
        return new Promise(resolve => { 
            let sql = `SELECT * FROM tbl_transactions_services_product where transaction_id = '${transaction_id}'`
             connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    loadAllOTCProductsTransaction(transaction_id) {
        return new Promise(resolve => { 
            let sql = `SELECT * FROM tbl_transactions_otc_product where transaction_id = '${transaction_id}'`
            console.log(sql )
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    loadAllServicesTransaction(transaction_id) {
        return new Promise(resolve => { 
            let sql = `SELECT * FROM tbl_transactions_services where transaction_id = '${transaction_id}'`
            console.log(sql )
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }
    loadAllCommissionsTransaction(transaction_id) {
        return new Promise(resolve => { 
            let sql = `SELECT * FROM tbl_transactions_commisions where transaction_id = '${transaction_id}'`
            console.log(sql ) 
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        })
    }

    //  DASHBOARD DATA 
      loadAllTransactionsPerDateDashboard(organization_id, date1, date2) {
        console.log(organization_id, date1, date2)
        return new Promise((resolve) => {
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `select  A.* from tbl_transactions A 
            where A.organization_id = '${organization_id}' 
            and A.transaction_created_date between '${date1}' and '${date2}'
            and A.status =1
            ORDER BY A.transaction_created_date ASC
            `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.transaction_created_date = moment(item.transaction_created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
        })
    }
     loadAllYearlyTransactions(organization_id) {
        return new Promise(resolve => { 
           let date1 = moment().startOf('year').format('YYYY-MM-DD 00:00:00')
            let date2 = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
            let sql = `select  A.* from tbl_transactions A 
            where A.organization_id = '${organization_id}' 
            and A.transaction_created_date between '${date1}' and '${date2}'
            and A.status = 1 
            ORDER BY A.transaction_created_date ASC
            `
             console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.transaction_created_date = moment(item.transaction_created_date).format('YYYY-MM-DD HH:mm:ss A')
                });
                resolve(results)
            })
        })
    }
    loadAllServicesSales( organization_id) {
        return new Promise(resolve => { 
            let date1 = moment().startOf('year').format('YYYY-MM-DD 00:00:00')
            let date2 = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
            let sql =
            `
            SELECT 
            A.transaction_id,
            D.category_id,
            D.category_name,
            B.service_id , B.service_name,
            B.price,
            ( B.price * (A.total_commissions / 100 )) AS 'commissions',
            ABS( ( B.price * (A.total_commissions / 100 )) - B.price ) as 'total_net_sales'
            FROM tbl_transactions_services A 
            inner join tbl_services B on B.service_id = A.service_id
            inner JOIN tbl_transactions C on C.transaction_id = A.transaction_id
            inner join tbl_category D on B.category_id = D.category_id
            WHERE A.created_date BETWEEN '${date1}' and '${date2}'
            and A.organization_id = '${organization_id}' and A.status = 1
           
            
            `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.created_date = moment(item.created_date).format('YYYY-MM-DD')
                });
                resolve(results)
            })
        })
    }
    loadAllServicesSalesPerPage(organization_id ,page , itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return new Promise(resolve => { 
            let date1 = moment().startOf('year').format('YYYY-MM-DD 00:00:00')
            let date2 = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
            let sql =
            `
            SELECT 
            A.transaction_id,
            D.category_id,
            D.category_name,
            B.service_id , B.service_name,
            B.price,
            ( B.price * (A.total_commissions / 100 )) AS 'commissions',
            ABS( ( B.price * (A.total_commissions / 100 )) - B.price ) as 'total_net_sales'
            FROM tbl_transactions_services A 
            inner join tbl_services B on B.service_id = A.service_id
            inner JOIN tbl_transactions C on C.transaction_id = A.transaction_id
            inner join tbl_category D on B.category_id = D.category_id
            WHERE A.created_date BETWEEN '${date1}' and '${date2}'
            and A.organization_id = '${organization_id}' and A.status = 1
            LIMIT ${itemsPerPage} OFFSET ${offset}
            
            `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.created_date = moment(item.created_date).format('YYYY-MM-DD')
                });
                resolve(results)
            })
        })
    }
    loadAllOTCSales( organization_id) {
        return new Promise(resolve => { 
          let date1 = moment().startOf('year').format('YYYY-MM-DD 00:00:00')
            let date2 = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
            let sql =
        `
            SELECT A.*,B.product_name,
            (A.product_total_amount * ( A.total_commissions / 100 )) as 'commissions',
            ABS(A.product_total_amount * ( A.total_commissions / 100 ) - A.product_total_amount) as 'total_net_sales'
            FROM tbl_transactions_otc_product A
            INNER JOIN tbl_products B on A.product_id = B.product_id

            WHERE A.date_created BETWEEN '${date1}' and '${date2}' 
            and A.organization_id = '${organization_id}' 
            and A.status = 1 
        `
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                 if (error) throw error;
                results.forEach(item => {
                    item.created_date = moment(item.created_date).format('YYYY-MM-DD')
                });
                resolve(results)
            })
        })
    }

}
function generateID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
    console.log(timestamp + randomStr)
    return timestamp+randomStr
}
function readAffectedServicesProduct(data) {
    const { inventory_id , organization_id } = data 
    return new Promise(resolve => { 
        let sql = `Select * from tbl_inventory where inventory_id ='${inventory_id}' and organization_id = '${organization_id}'`
         connection.query(sql, function (error, results, fields) {
             if (error) throw error;
             console.log(results )
            resolve(results)
        })
    })
}
function readAffectedOTCProduct(data) {
    const { product_id , organization_id } = data 
    return new Promise(resolve => { 
        let sql = `Select * from tbl_products where product_id ='${product_id}' and organization_id = '${organization_id}'`
         connection.query(sql, function (error, results, fields) {
             if (error) throw error;
             console.log(results )
            resolve(results)
        })
    })
}
 function insertTransactions( data , table ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        // console.log(columns , values)
        let sql = `insert into ${table} 
        (${columns})
        values
        (${values})
        `
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if(error) reject(error);
            resolve(results)
        })
    })
}

function updateTransaction( data  , key , table   ){
 return new Promise((resolve , reject )=>{ 
    let sql = `UPDATE ${table} SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE ${key}= '${data[key]}'`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if(error) reject(error);
        if(results)
        resolve(results)
    })
 })
}
