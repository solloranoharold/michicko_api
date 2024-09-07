
const connection = require('../dbConnections')
const { queryData } = require('../evaluateConnection')
const moment = require('moment')
module.exports = new class Expenses { 

    async addUpdateCategories( data , table ) {
        if (data.method == 0) {
           return await insertCategories(data, table)
        } else {
        //    return await updateCategories(data, table)
        }
    }

    async readExistingCategory(category_name, organization_id , table ) {
         let sql = `select * from ${table} where organization_id = '${organization_id}' and category_name = '${category_name}'`
        return await queryData(sql)
    }


    async readCategory1(organization_id) { 
        let sql = `select A.*,B.category_name as 'category1_name' from tbl_category_expenses_category1 A 
        left join tbl_category_expenses_category2 B on  A.category1_expense_id = B.category1_expense_id
        where A.organization_id = '${organization_id}'`
        let results = await queryData(sql)
        results.forEach(item => {
            item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss')
        });
        return await Promise.resolve(results)
    }
     async readCategory2(organization_id) { 
         let sql = `select * from tbl_category_expenses_category2 where organization_id = '${organization_id}'`
        let results = await queryData(sql)
        results.forEach(item => {
            item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss')
        });
        return await Promise.resolve(results)
    }
    
}

async function insertCategories( data , table  ){
    delete data.method
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into ${table} 
        (${columns})
        values
        (${values})
        `
    return await queryData(sql)
}
async function updateCategories( data , table ){
    delete data.method
        let sql = `UPDATE ${table} SET `;
        let updates=[]
        for( const key in data ){
            updates.push(`${key}=${ typeof data[key]==='string' ? `'${data[key]}'` : data[key]}`)
        }
        sql+=updates.join(',')
        sql+= ` WHERE payment_id= '${data.payment_id}'`
    console.log(sql)
    return await queryData(sql)
}