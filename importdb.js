require('dotenv').config()
const fs = require('fs-extra')
var { host, user, password, database } = process.env
var mysql = require('mysql2');


// Create a connection to the RDS instance
const connection = mysql.createConnection({
 host: host,
      user: user,
      password: password,
      database: database
});

// Read the SQL file
fs.readFile('./michikodb.sql', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the SQL file content into individual statements
  const sqlStatements = data.split(';').map(statement => statement.trim()).filter(statement => statement);

  // Execute each SQL statement
  sqlStatements.forEach((statement, index) => {
    connection.query(statement, (error, results) => {
      if (error) {
        console.error(`Error executing statement ${index + 1}:`, error);
      } else {
        console.log(`Statement ${index + 1} executed successfully.`);
      }
    });
  });

  // Close the connection after executing all statements
  connection.end();
});