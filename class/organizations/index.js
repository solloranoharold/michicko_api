
const connection = require('../dbConnections')
const { openConnection , closeConnection  } = require('../evaluateConnection')
const moment = require('moment')
module.exports = new class Organizations { 
    constructor() { }

     searchOrganization(employee_id, search ) {
         return new Promise((resolve, reject) => { 
             openConnection()
             let sql = `select * from tbl_organizations where organization_name LIKE '%${search}%'`
             if (employee_id != 0) sql += ` and manage_by = '${employee_id}'`
             console.log(sql)
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results.length)
                    results.forEach(item => {
                        item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                    });
                 closeConnection()
                 resolve(results)
                 
            })
        })
    }
   async organizationsTotalCount(employee_id, search ) {
       return new Promise((resolve, reject) => { 
           openConnection()
           let sql = `select Count(*) AS TOTAL from tbl_organizations`
           if (employee_id != 0 || search != 'undefined') sql += ' where'
          if (employee_id != 0 && search != 'undefined') sql+=` manage_by = '${employee_id}' and  organization_name LIKE '%${search}%'`
           else if(employee_id != 0 ) sql+=` manage_by = '${employee_id}'`
           else if (search != 'undefined') sql += `  organization_name LIKE '%${search}%'`
           console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if (results.length) {
                       results.forEach(item => {
                        item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                       });
                    closeConnection()
                     resolve(results[0])
                }
                 
               
            })
       })
    }
    async addUpdateOrganizations(data) {
        if (data.method == 0) {
            data.organization_id = generateID()
           return await insertOrganization(data)
       }else{
        return await updateOrganization(data)
       }
    }
     readOrganizations() {
         return new Promise((resolve, reject) => { 
              openConnection()
             let sql = `SELECT A.*
             FROM tbl_organizations A 
             `
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                    results.forEach(item => {
                        item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                    });
                 closeConnection()
                resolve(results)
            })
        })
    }
     readOrganizationsPerID( organization_id) {
         return new Promise((resolve, reject) => { 
             openConnection()
             let sql = `SELECT * FROM tbl_organizations where organization_id = '${organization_id}'`
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                     resolve(results)
                 closeConnection()
            })
        })
    }
    readExistingOrganization(organization) {
        return new Promise((resolve, reject) => {
            openConnection()
             let sql = `SELECT * FROM tbl_organizations where organization_name = '${organization}'`
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                 if (results) {
                     closeConnection()
                      resolve(results)
                 }
                    
                    
                
            })
        })
    }

    readOrganizationsAdmin(employee_id) {
        return new Promise((resolve, reject) => { 
            openConnection()
             let sql = `SELECT A.*,Concat(B.last_name ,' ',B.first_name) as employee_name 
             FROM tbl_organizations A
             LEFT JOIN tbl_employees B ON A.manage_by = B.employee_id
             `
            if(employee_id!=0) ` where A.manage_by = '${employee_id}'`
             connection.query(sql, function (error, results, fields) {
                 if (error) reject(error);
                 closeConnection()
                if(results)
                    results.forEach(item => {
                        item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
                    });
                resolve(results)
            })
        })
        
    }
}
function  generateID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
    console.log(timestamp + randomStr)
    return timestamp+randomStr
}
function updateOrganization( data ){
 delete data.method 
    return new Promise((resolve, reject) => { 
     openConnection()
    console.log(data , 'dasdasdasda')
    let sql = `UPDATE tbl_organizations SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE organization_id= '${data.organization_id}'`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) reject(error);
        closeConnection()
        if (results) 
            resolve(results)
        
        
    })
 })
}

function insertOrganization( data ){
    delete data.method
    return new Promise((resolve, reject) => { 
        openConnection()
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_organizations 
        (${columns})
        values
        (${values})
        `
        console.log(sql )
        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            closeConnection()
            resolve(results)
        })
    })
}