
const connection = require('../dbConnections')
module.exports = new class Organizations { 
    constructor() { }
    async addUpdateOrganizations(data) {
        if (data.method == 0) {
            data.organization_id = generateID()
           return await insertOrganization(data)
       }else{
        return await updateOrganization(data)
       }
    }
     readOrganizations() {
         return new Promise((resolve , reject) => { 
             let sql = 'SELECT * FROM tbl_organizations'
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
     readOrganizationsPerID( organization_id) {
         return new Promise((resolve , reject) => { 
             let sql = `SELECT * FROM tbl_organizations where organization_id = '${organization_id}'`
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })
    }
    readExistingOrganization(organization) {
        return new Promise((resolve, reject) => {
             let sql = `SELECT * FROM tbl_organizations where organization_name = '${organization}'`
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
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
 return new Promise((resolve , reject )=>{ 
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
        if(error) reject(error);
        if(results)
        resolve(results)
    })
 })
}

function insertOrganization( data ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
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
            if(error) reject(error);
            resolve(results)
        })
    })
}