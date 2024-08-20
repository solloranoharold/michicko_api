const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')
module.exports = new class Cashless { 

    async addUpdateEPayment( data ){
        if (data.method == 0) {
            let a = await insertEPayment(data )
            return await a 
       }else{
        let a = await updateEPayment(data )
        return await a 
       }

    }

    async readExistingEPayment(payment_method, organization_id ){
        // return new Promise((resolve , reject) =>{ 
            let sql = `select * from tbl_e_payment where payment_method = '${payment_method}' and organization_id = '${organization_id}'`
            return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }
    async loadEpayments( organization_id) {
        // return new Promise((resolve , reject ) => { 
        let sql = `SELECT * FROM tbl_e_payment WHERE organization_id = '${organization_id}'`
        return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }

}
async function insertEPayment( data ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_e_payment 
        (${columns})
        values
        (${values})
        `
    return await queryData(sql)
        // connection.query(sql, function (error, results, fields) {
        //     if(error) reject(error);
        //     resolve(results)
        // })
    // })
}
async function updateEPayment( data ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        let sql = `UPDATE tbl_e_payment SET `;
        let updates=[]
        for( const key in data ){
            // if(typeof data[key] === "string") console.log( key , data[key])
            updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
            // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
        }
        sql+=updates.join(',')
        sql+= ` WHERE payment_id= '${data.payment_id}'`
    console.log(sql)
    return await queryData(sql)
    //     connection.query(sql, function (error, results, fields) {
    //         if(error) reject(error);
    //         if(results)
    //         resolve(results)
    //     })
    // })
}