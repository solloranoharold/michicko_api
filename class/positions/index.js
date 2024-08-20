const connection = require('../dbConnections')
const { openConnection , closeConnection  } = require('../evaluateConnection')
module.exports = new class Positions { 
    constructor() { }
    

    loadPositions() {
        return new Promise((resolve, reject) => { 
            openConnection()
            let sql = "SELECT * FROM tbl_positions"
            connection.query(sql, function (error, results, fields) {
                if (error) reject(error);
                closeConnection()
                resolve(results)
            })
        })
    }
}