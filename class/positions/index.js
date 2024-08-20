// const connection = require('../dbConnections')
const {queryData } = require('../evaluateConnection')
module.exports = new class Positions { 
    constructor() { }
    

    async loadPositions() {
        // return new Promise((resolve, reject) => { 
        let sql = "SELECT * FROM tbl_positions"
        return await queryData(sql)
        //     connection.query(sql, function (error, results, fields) {
        //         if(error) reject(error);
        //         resolve(results)
        //     })
        // })
    }
}