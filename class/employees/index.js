
const connection = require('../dbConnections')
const { pad } = require('../generateID')
const moment = require('moment')
module.exports = new class Employees {
    constructor(){}

    async addUpdateEmployees( data ){
        console.log('/addUpdateEmployees' , data )
        if (data.method == 0) {
            //    data.employee_id = generateID()
            let count = await getTotalCountForID()
            let id = count[0].TOTAL + 1 
            data.employee_id =  pad(id , 8)
           return await insertEmployee(data)
        } else {
        data.date_created = moment(data.date_created).format('YYYY-MM-DD HH:mm:ss')
        return await updateEmployee(data)
       }
    }
    readExistingEmployees( last_name , first_name , organization_id   ){
        return new Promise((resolve , reject) =>{ 
            let sql = `select * from tbl_employees where last_name = '${last_name}' and first_name = '${first_name}' and  organization_id ='${organization_id}'`
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })
        })
    }
    readEmployeeTotalCount(employee_id, organization_id, search) {
        console.log(search , 'search')
        return new Promise((resolve , reject)=>{ 
            let sql=`SELECT COUNT(*) AS TOTAL   FROM tbl_employees WHERE organization_id= '${organization_id}'` 
            if(search!='undefined') sql+=` and  Concat(last_name , ' ', first_name)    LIKE '%${search}%'`
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results[0])
            })

        })
    }

    searchEmployees( organization_id , search ) {
        return new Promise((resolve , reject ) => { 
        let sql=`SELECT *  FROM tbl_employees WHERE organization_id= '${organization_id}'` 
            if(search!=undefined) sql+=` and  Concat(last_name , ' ', first_name)   LIKE '%${search}%'`
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
    loadEmployees( employee_id , organization_id , page , itemsPerPage ){
        
        const offset = (page - 1) * itemsPerPage;
        return new Promise((resolve ,reject)=>{ 
            let  sql=`SELECT *  FROM tbl_employees WHERE organization_id= '${organization_id}' 
            ORDER BY employee_id LIMIT ${itemsPerPage} OFFSET ${offset }
            `

            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
     loadEmployeesOption(  organization_id  ){
        return new Promise((resolve ,reject)=>{ 
            let sql=`SELECT *  FROM tbl_employees WHERE organization_id= '${organization_id}' `

            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
    
}
function getTotalCountForID(){
    return new Promise(resolve => { 
        let sql = `SELECT Count(*) AS TOTAL  FROM tbl_employees`
         connection.query(sql, function (error, results, fields) {
                if(error) throw error
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
function updateEmployee( data ){
 delete data.method 
 return new Promise((resolve , reject )=>{ 
    console.log(data , 'dasdasdasda')
    let sql = `UPDATE tbl_employees SET `;
    let updates=[]
    for( const key in data ){
        // if(typeof data[key] === "string") console.log( key , data[key])
        updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
    }
    sql+=updates.join(',')
    sql+= ` WHERE employee_id= '${data.employee_id}'`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        if(error) reject(error);
        if(results)
        resolve(results)
    })
 })
}

function insertEmployee( data ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_employees 
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