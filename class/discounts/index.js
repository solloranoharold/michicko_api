
const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')


module.exports = new class Discounts { 


    async addUpdateDiscounts(data) {
        // console.log(data)
        if (data.method == 0) {
        let a = await insertDiscounts(data )
        return await a 
       }else{
        let a = await updateDiscount(data )
        return await a 
       }

    }
    async readExistingDiscount(description , organization_id ) {
        let sql = `SELECT * FROM tbl_discounts where organization_id ='${organization_id}' and description = '${description}'`
        console.log(sql)
        return await queryData(sql)

    }
    async readDiscounts( organization_id ) {
        let sql = `SELECT * FROM tbl_discounts where organization_id ='${organization_id}'`
        return await queryData(sql)

    }
}

async function insertDiscounts( data ){
    delete data.method
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_discounts
        (${columns})
        values
        (${values})
        `
    return await queryData(sql)
}

async function updateDiscount( data ){
    delete data.method
    // return new Promise((resolve , reject )=>{ 
        let sql = `UPDATE tbl_discounts SET `;
        let updates=[]
        for( const key in data ){
            // if(typeof data[key] === "string") console.log( key , data[key])
            updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
            // console.log(`'${key}'=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}` )
        }
        sql+=updates.join(',')
        sql+= ` WHERE discount_id= '${data.discount_id}'`
    console.log(sql)
    return await queryData(sql)
}