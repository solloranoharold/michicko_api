require('dotenv').config()
const fs = require('fs-extra')
var { host, user, password, database } = process.env
var mysql  = require('mysql');
const targetDbConnection = mysql.createConnection({
    host: host,
      user: user,
      password: password,
      database: database
});

targetDbConnection.connect
fs.readFile('./michikodb.sql', 'utf8', (err, sql) => {
    if (err) throw err;

    targetDbConnection.query(sql, (error, results) => {
        if (error) throw error;
        console.log('Dump imported successfully:', results);
        targetDbConnection.end();
    });
});