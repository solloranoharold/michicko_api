module.exports = { 
    apps: [
        {
            name: 'pos-inventory-api',
            script: 'npm',
            args: 'run dev',
            env: {
                NODE_ENV: 'development',
                host: "127.0.0.1",
                user:"root",
                password:'',
                database:"michikadb",
                passwordSalt:"michika",
                SECRET_KEY: "MICHIKASALONWEB",
                api_host:"http://192.168.5.38:8080"
            }
       }
    ]
}