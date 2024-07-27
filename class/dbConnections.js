
var mysql  = require('mysql');
require("dotenv").config()
var { host , user , password , database } = process.env
var connection = mysql.createConnection({
    host     : host,
    user     : user,
    password : password,
    database : database
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL server');
  });
  
module.exports = connection