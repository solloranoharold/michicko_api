
require('dotenv').config()
const jwt = require('jsonwebtoken')
const mySecretKey = process.env.SECRET_KEY
function verifyCookies( token ) {
    try {
        const user = jwt.verify(token, mySecretKey);
        return  user 
    } catch (err) {
        console.log(err)
    }
}
module.exports = {verifyCookies}