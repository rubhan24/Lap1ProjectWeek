const express = require ('express')
const app = express ()
const port = 8000; 
const cors = require('cors')

app.use(cors())

data = [];

app.get('/', (req, res)=>{
    res.send(data)
})

app.listen (port, ()=>{
    console.log(`Example app listening on ${port}`)
})