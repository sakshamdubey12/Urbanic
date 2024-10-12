const express = require('express')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const app = express();

require('./config/db')
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('API is working')
})

app.use('/user', require('./routes/userRoutes') )

app.listen(3000)