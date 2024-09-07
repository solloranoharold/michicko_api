const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')
module.exports = new class Services { 

    async readServices(service, organization_id) {
        // return new Promise((resolve, reject) => { 
              let sql = `select * from tbl_services where service_name = '${service}' and organization_id = '${organization_id}'`
            return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         resolve(results)
        //     })  
        //  })
    }
    
    async addUpdateService(data) {
        // console.log(data , 'addUpdateService')
        if (data.method == 0) {
           data.service_id = generateID()
        let a = await insertService(data )
        return await a 
       }else{
        let a = await updateService(data )
        return await a 
       }

    }
    async getServicesTotalCount( organization_id , search ) {
        // return new Promise((resolve , reject) => { 
            let sql = `SELECT count(*) AS TOTAL FROM tbl_services A where organization_id = '${organization_id}'`
            if(search!='undefined') sql+=` and A.service_name LIKE '%${search}%'`
            console.log(sql)
        let results = await queryData(sql)
        return await Promise.resolve(results[0])

        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         if(results)
        //         resolve(results[0])
        //     })
        // })
    }
   async loadServices( organization_id, page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        // return new Promise((resolve, reject) => { 
            let sql = `SELECT A.*,A.status AS 'service_status',B.*,C.* FROM tbl_services A 
            INNER JOIN tbl_category B ON A.category_id = B.category_id
            INNER JOIN tbl_organizations C on A.organization_id = C.organization_id
            where A.organization_id = '${organization_id}'
            `
            sql += ` ORDER BY A.service_id LIMIT ${itemsPerPage} OFFSET ${offset}`
            
       console.log(sql)
       return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         // console.log(results , 'loadClients')
        //         if(error) reject(error);
        //         if(results)
        //         resolve(results)
        //     })
        // })  
    }
    async searchServices( organization_id , search   ) {
        // return new Promise((resolve, reject) => { 
            let sql = `SELECT A.*,B.*,C.* FROM tbl_services A 
            INNER JOIN tbl_category B ON A.category_id = B.category_id
            INNER JOIN tbl_organizations C on A.organization_id = C.organization_id
            WHERE A.service_name LIKE '%${search}%' AND A.organization_id ='${organization_id}'`
        console.log(sql)
        return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }
   async loadAllServices(organization_id) {
        // return new Promise((resolve, reject) => { 
            let sql = `SELECT * FROM tbl_services where organization_id = '${organization_id}' and status = 1`
            return await queryData(sql)     
       //  connection.query(sql, function (error, results, fields) {
            //     //  console.log(results , 'searchAccount')
            //     if(error) reject(error);
            //     resolve(results)
            // })
    //    })
    }
}

async function insertService( data ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        // console.log(columns , values)
        let sql = `insert into tbl_services 
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
function  generateID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
    console.log(timestamp + randomStr)
    return timestamp+randomStr
}
async function updateService( data ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        let sql = `UPDATE tbl_services SET `;
        let updates=[]
        for( const key in data ){
            // if(typeof data[key] === "string") console.log( key , data[key])
            updates.push(`${key}=${ typeof data[key]==='string' ? `"${data[key]}"` : data[key]}`)
            // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
        }
        sql+=updates.join(',')
        sql+= ` WHERE service_id= '${data.service_id}'`
    console.log(sql)
    return await queryData(sql)
    //     connection.query(sql, function (error, results, fields) {
    //         if(error) reject(error);
    //         if(results)
    //         resolve(results)
    //     })
    // })
}
