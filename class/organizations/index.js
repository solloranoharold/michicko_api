
const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')
const moment = require('moment')
module.exports = new class Organizations { 
    constructor() { }

     async searchOrganization(employee_id, search ) {
             let sql = `select * from tbl_organizations where organization_name LIKE '%${search}%'`
             if (employee_id != 0) sql += ` and manage_by = '${employee_id}'`
             console.log(sql)
             return await queryData(sql)
    }
   async organizationsTotalCount(employee_id, search ) {
           let sql = `select Count(*) AS TOTAL from tbl_organizations`
           if (employee_id != 0 || search != 'undefined') sql += ' where'
          if (employee_id != 0 && search != 'undefined') sql+=` manage_by = '${employee_id}' and  organization_name LIKE '%${search}%'`
           else if(employee_id != 0 ) sql+=` manage_by = '${employee_id}'`
           else if (search != 'undefined') sql += `  organization_name LIKE '%${search}%'`
       console.log(sql)
       let results = await queryData(sql)
       results.forEach(item => {
            item.date_created = moment(item.date_created).format('YYYY-MM-DD HH:mm:ss A')
        });
       return await Promise.resolve(results[0])
    }
    async addUpdateOrganizations(data) {
        if (data.method == 0) {
            data.organization_id = generateID()
           return await insertOrganization(data)
       }else{
        return await updateOrganization(data)
       }
    }
    async readOrganizations() {
             let sql = `SELECT A.*
             FROM tbl_organizations A 
             `
            return await queryData(sql)
    }
     async readOrganizationsPerID( organization_id) {
        //  return new Promise((resolve, reject) => { 
         let sql = `SELECT * FROM tbl_organizations where organization_id = '${organization_id}'`
         return await queryData(sql)
    }
    async readExistingOrganization(organization) {
             let sql = `SELECT * FROM tbl_organizations where organization_name = '${organization}'`
            return await queryData(sql)    
    }

    async readOrganizationsAdmin(employee_id) {
             let sql = `SELECT A.*,Concat(B.last_name ,' ',B.first_name) as employee_name 
             FROM tbl_organizations A
             LEFT JOIN tbl_employees B ON A.manage_by = B.employee_id
             `
            if (employee_id != 0) sql += ` where A.manage_by = '${employee_id}'`
        return await queryData(sql)
        
    }
}
function  generateID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
    console.log(timestamp + randomStr)
    return timestamp+randomStr
}
async function updateOrganization( data ){
 delete data.method 
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
    return await queryData(sql)
}

async function insertOrganization( data ){
    delete data.method
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => connection.escape(value)).join(', ');
        
        console.log(columns , values)
        let sql = `insert into tbl_organizations 
        (${columns})
        values
        (${values})
        `
        console.log(sql)
        return await queryData(sql)
}