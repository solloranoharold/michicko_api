const CryptoJS = require("crypto-js")
require('dotenv').config()
const moment = require('moment')
const passwordSalt = process.env.passwordSalt
const connection = require('../dbConnections')
const { pad } = require('../generateID')
const { openConnection , closeConnection  } = require('../evaluateConnection')
module.exports = new class Accounts { 
    constructor(){}

    async evaluateAccountStatus( organization_id , status ) {
        let orgAccounts = await this.getAccountsPerOrg(organization_id)
        for (let x = 0; x < orgAccounts.length; x++){
            orgAccounts[x].account_status = status 
            orgAccounts[x].date_created = moment(orgAccounts[x].date_created).format('YYYY-MM-DD HH:mm:ss')
            await updateAccount( orgAccounts[x])
        }

        return await status 
    }

    getAccountsPerOrg(  organization_id  ) {
        return new Promise(resolve => {
            openConnection()
            let sql = `SELECT * FROM tbl_accounts where organization_id = '${organization_id}'`
             connection.query(sql, function (error, results, fields) {
                 console.log(results, 'searchAccount')
                 closeConnection()
                resolve(results)
            })
        })
    }
     loginUsers( username , password ){
         return new Promise((resolve, reject) => { 
            openConnection()
            let sql = `SELECT A.*,B.*,C.*,D.*,B.position AS account_position FROM tbl_accounts A 
            INNER JOIN tbl_positions B ON B.position_id = A.position_id 
            INNER JOIN tbl_employees C ON A.employee_id = C.employee_id
            LEFT JOIN tbl_organizations D ON A.organization_id = D.organization_id
            WHERE A.username = '${username}' and A.account_status = 1 `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                console.log(results)
                if (error) reject(error);
                closeConnection()
                if (results.length == 0) {
                    resolve([])
                } else {
                    let decryptedPassword =  decryptPassword( results[0].password )
                    console.log(decryptedPassword , 'decryptedPassword' , password)
                    if(password === decryptedPassword) {
                        delete results[0].password
                        resolve(results)
                    }
                    resolve([])
                }
                
             })
        })
    }
    searchAccount(employee_id , organization_id , search   ) {
        return new Promise((resolve, reject) => { 
            openConnection()
            let sql = `SELECT A.*,B.*,C.*,B.position AS "account_position"  FROM tbl_accounts A INNER JOIN tbl_positions B ON A.position_id = B.position_id INNER JOIN tbl_employees C ON C.employee_id = A.employee_id  
                WHERE
                A.username LIKE '%${search}%'
                 OR C.last_name LIKE '%${search}%'
                OR C.first_name LIKE '%${search}%'
                AND A.organization_id ='${organization_id}' 
                and A.employee_id != '${employee_id}'
                `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                 console.log(results , 'searchAccount')
                if (error) reject(error);
                closeConnection()
                resolve(results)
            })
        })
    }
     readExistingAccount( username ) {
         return new Promise((resolve, reject) => { 
             openConnection()
             let sql = `SELECT * FROM tbl_accounts where username = '${username}'`
             connection.query(sql, function (error, results, fields) {
                 if (error) reject(error);
                 closeConnection()
                if(results)
                resolve(results)
            })
        })
    }
     async addUpdateAccount( data ){
         console.log('/addUpdateClient')
         delete data.cpassword
        
         console.log(data )
         if (data.method == 0) {
             //  data.account_id = generateID()
             let count = await getTotalCountForID()
             let id = count[0].TOTAL + 1 
            data.account_id = pad( id , 8 )
          data.password = hashPassword(data.password)
           return await insertAccount(data)
         } else {
             if (data.password) {
                let password = decryptPassword(data.password)
                data.password = hashPassword(password)
             }
           
            return await updateAccount(data)
        }
    }
    async updateAccountPassword(data) {
        let password = hashPassword(data.password)
        data.password = password
        return await updateAccount( data )
    }
    async resetAccountPassword( data ) {
        data.password = hashPassword(data.username)
        return await updateAccount(data)
    }
    async updateSessionAccountStatus( data ) {
         console.log('/updateSessionAccountStatus')
        return await updateAccount(data)
    }
    accountTotalCount(employee_id, organization_id, search) {
        return new Promise((resolve, reject) => { 
             openConnection()
            // SELECT A.*,B.*,C.*,B.position AS "account_position"  
            //FROM tbl_accounts A INNER JOIN tbl_positions B ON A.position_id = B.position_id INNER JOIN tbl_employees C ON C.employee_id = A.employee_id
             let sql = `SELECT COUNT(*) AS TOTAL FROM tbl_accounts A  
            INNER JOIN tbl_positions B ON A.position_id = B.position_id 
            INNER JOIN tbl_employees C ON C.employee_id = A.employee_id
            WHERE A.organization_id= '${organization_id}' AND A.employee_id != '${employee_id}'
            `
            if(search!='undefined') sql+= ` AND  username LIKE '%${search}%'
                 OR C.last_name LIKE '%${search}%'
                OR C.first_name LIKE '%${search}%'`
             console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                closeConnection()
                if(results)
                resolve(results[0])
            })

        })
    }
  loadAccounts( employee_id , organization_id , page , itemsPerPage ){
        
        const offset = (page - 1) * itemsPerPage;
      return new Promise((resolve, reject) => { 
            openConnection()
            let sql = `SELECT A.*,B.*,C.*,B.position AS "account_position"  FROM tbl_accounts A INNER JOIN tbl_positions B ON A.position_id = B.position_id INNER JOIN tbl_employees C ON C.employee_id = A.employee_id
            WHERE A.organization_id= '${organization_id}' AND A.employee_id !='${employee_id}'
            ORDER BY account_id LIMIT ${itemsPerPage} OFFSET ${offset}`



            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                closeConnection()
                if (results)
                resolve(results)
            })
        })
    }
    
} 
 function getTotalCountForID() {
     return new Promise(resolve => { 
         openConnection()
         let sql = `SELECT count(*) AS TOTAL FROM tbl_accounts `
         connection.query(sql, function (error, results, fields) {
             if (error) throw error
             closeConnection()
            resolve(results)
        })
     })
}
// function  generateID() {
//     const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
//     const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
//     console.log(timestamp + randomStr)
//     return timestamp+randomStr
// }
 function hashPassword( password ){
    return  CryptoJS.AES.encrypt(password, passwordSalt).toString();
}
function decryptPassword(password) {
    console.log('decrypted' , password)
    const bytes  = CryptoJS.AES.decrypt(password, passwordSalt);
    return bytes.toString(CryptoJS.enc.Utf8);
     
}

function updateAccount( data ){
 delete data.method 
 return new Promise((resolve , reject )=>{ 
     console.log(data, 'dasdasdasda')
     openConnection()
    let sql = `UPDATE tbl_accounts SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE account_id= '${data.account_id}'`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if (error) reject(error);
        closeConnection()
        if(results)
        resolve(results)
    })
 })
}

function insertAccount( data ){
    delete data.method
    return new Promise((resolve, reject) => { 
        openConnection()
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_accounts 
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