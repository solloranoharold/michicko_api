const connection = require('../dbConnections')
const { openConnection , closeConnection  } = require('../evaluateConnection')
module.exports = new class Category { 

    loadCategories() {
        return new Promise((resolve, reject) => { 
            openConnection()
            let sql = 'Select * from tbl_category'
             connection.query(sql, function (error, results, fields) {
                 if (error) reject(error);
                 closeConnection()
                resolve(results)
            })
        })
    }
}