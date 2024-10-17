const fs = require('fs-extra')
const { queryData } = require('./class/evaluateConnection')

async function migrateDatabase() {
    let sqlScript = await readDatabaseSQLScript()
    return await queryData( sqlScript )
}

function readDatabaseSQLScript() {
    return new Promise(resolve => {
        fs.readFile('./michikodb.sql', 'utf8', (err, sql) => {
            if (err) throw err;
            resolve(sql)
        });
    })
}


migrateDatabase().then(() => { 
    console.log('Database has been migrated')
})