const connection = require('./dbConnections')
function openConnection() {
    connection.connect((err) => {
        if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
        }
        console.log('Connected to MySQL server');
    });
}

function closeConnection() {
     connection.end((endErr) => {
            if (endErr) {
                console.error('Error closing the connection:', endErr);
            } else {
                console.log('Connection closed.');
            }
        });
}

module.exports = { openConnection , closeConnection }