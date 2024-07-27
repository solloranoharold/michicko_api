const connection = require('../dbConnections')
module.exports = new class Positions { 
    constructor() { }
    

    loadPositions() {
        return new Promise((resolve, reject) => { 
            let sql = "SELECT * FROM tbl_positions"
            connection.query(sql, function (error, results, fields) {
                if(error) reject(error);
                resolve(results)
            })
        })
    }
}