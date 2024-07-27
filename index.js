require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const cors = require("cors");
const http = require('http')
const app = express()
app.use(cors({
  origin:  process.env.api_host, // Frontend URL
  credentials: true // Allow credentials (cookies)
}))
console.log(process.env.api_host)
const httpServer = http.createServer({}, app)
const io = require('socket.io')(httpServer)


io.on("connection", (socket) => {
  console.log('A user connected');

  socket.on('test', (s) => {
    console.log(s, 'asdasdas')
    io.emit('test' , s )
  })
  socket.on('update notification', () => { 
    socket.emit('update notification')

  })
  socket.on('load notification', () => { 
    console.log('load notification')
    io.emit('load notification')
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => { 
  res.send('HELLO WORLD')
})

app.use('/employees' , require('./routes/employees/'))
app.use('/accounts' , require('./routes/accounts/'))
app.use('/clients' , require('./routes/clients/'))
app.use('/organizations' , require('./routes/organizations/'))
app.use('/positions' , require('./routes/positions/'))
app.use('/services' , require('./routes/services/'))
app.use('/categories', require('./routes/categories/'))
app.use('/inventory', require('./routes/inventory/'))
app.use('/products', require('./routes/products/'))
app.use('/transactions', require('./routes/transactions/'))
app.use('/epayment', require('./routes/epayment/'))
app.use('/reports', require('./routes/reports/'))
app.use('/import', require('./routes/import/'))











httpServer.listen(port, () => console.log('Secure server 🚀🔑 on port:' + port ))
