const connection = require('../dbConnections')

module.exports = new class Category { 

    loadCategories() {
        return new Promise((resolve, reject) => { 
            let sql = 'Select * from tbl_category'
             connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })
        })
    }
}