const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection') 
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'administrador',
    database: 'todolist'
}

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Welcome to my API TASKS')
})

app.use('/api', routes)

app.get('/api/alarm', routes)

app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})