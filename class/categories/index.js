// const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')
module.exports = new class Category { 

    async loadCategories() {
        let sql = 'Select * from tbl_category'
        return await queryData(sql)
        
    }
}