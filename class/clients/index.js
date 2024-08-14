const connection = require('../dbConnections')
const {pad} = require('../generateID')
module.exports = new class Clients { 
    constructor(){}


    async addUpdateClient( data ){
        if (data.method == 0) {
            let count = await getTotalCountForID()
            let id = count[0].TOTAL + 1 
           data.client_id = pad(id , 8)
        let a = await insertClient(data )
        return await a 
       }else{
        let a = await updateClient(data )
        return await a 
       }

    }
    loadAllClients(organization_id) {
        return new Promise((resolve, reject) => { 
            let sql = `SELECT * FROM tbl_clients where organization_id ='${organization_id}'`
            console.log(sql)
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })
        })
    }
    readExistingClients(last_name , first_name , organization_id ){
        return new Promise((resolve , reject) =>{ 
            let sql = `select * from tbl_clients where last_name = '${last_name}' and first_name = '${first_name}' and organization_id = '${organization_id}'`
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })
        })
    }
    getClientTotalCount( organization_id , search ) {
        return new Promise((resolve , reject) => { 
            let sql = `SELECT count(*) AS TOTAL FROM tbl_clients A where organization_id = '${organization_id}'`
            if(search!='undefined') sql+=` and A.last_name LIKE '%${search}%'
                OR A.first_name LIKE '%${search}%'`
             console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                if(results)
                resolve(results[0])
            })
        })
    }
    loadClients( organization_id, page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return new Promise((resolve, reject) => { 
            let sql = `Select A.*,B.* from tbl_clients A INNER JOIN tbl_organizations B ON A.organization_id = B.organization_id where A.organization_id = '${organization_id}'`
            sql += ` ORDER BY A.client_id LIMIT ${itemsPerPage} OFFSET ${offset}`
            
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                console.log(results , 'loadClients')
                if(error) reject(error);
                if(results)
                resolve(results)
            })
        })  
    }
     searchClient( organization_id , search   ) {
        return new Promise((resolve, reject) => { 
            let sql = `Select A.*,B.* from tbl_clients A INNER JOIN tbl_organizations B ON A.organization_id = B.organization_id
                WHERE CONCAT(A.last_name, ' ', A.first_name)  LIKE '%${search}%' AND A.organization_id ='${organization_id}'
                `
            console.log(sql)
            connection.query(sql, function (error, results, fields) {
                 console.log(results , 'searchAccount')
                if(error) reject(error);
                resolve(results)
            })
        })
    }
}
 function getTotalCountForID() {
     return new Promise(resolve => { 
         let sql = `SELECT count(*) AS TOTAL FROM tbl_clients `
         connection.query(sql, function (error, results, fields) {
            if(error) throw error
            resolve(results)
        })
     })
}

async function insertClient( data ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_clients 
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
// function  generateID() {
//     const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
//     const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
//     console.log(timestamp + randomStr)
//     return timestamp+randomStr
// }
async function updateClient( data ){
    delete data.method
    return new Promise((resolve , reject )=>{ 
        let sql = `UPDATE tbl_clients SET `;
        let updates=[]
        for( const key in data ){
            // if(typeof data[key] === "string") console.log( key , data[key])
            updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
            // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
        }
        sql+=updates.join(',')
        sql+= ` WHERE client_id= '${data.client_id}'`
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if(error) reject(error);
            if(results)
            resolve(results)
        })
    })
}
