const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnect')


const usersRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')



app.use(express.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/users', usersRoute)
app.use('/transactions', transactionsRoute)



app.get('/', (req, res) => res.send('Hello World!'))


const port =  process.env.PORT || 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))