// const connection = require('./dbConnections')
const mysql = require('mysql2/promise')
async function openConnection() {
     connection.connect((err) => {
        if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
        }
        console.log('Connected to MySQL server');
    });
}

require("dotenv").config()
var { host, user, password, database } = process.env

let connection;
async function getConnection() {
  if (!connection || connection.end) {
    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database
    });
  }
  return connection;
}



async function closeConnection() {
     connection.end((endErr) => {
            if (endErr) {
                console.error('Error closing the connection:', endErr);
            } else {
                console.log('Connection closed.');
            }
        });
}

async function queryData(sql) {
     let conn;
    try {
        conn = await getConnection();
        
        const [result] = await conn.query(sql);

        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        if (conn) {
        await conn.end(); // Explicitly close the connection if required
        }
    }
}



module.exports = { openConnection , closeConnection ,  queryData }