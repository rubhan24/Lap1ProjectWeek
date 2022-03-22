const express = require ('express')
const cors = require('cors')
const fs = require('fs')
const app = express ()
const port = process.env.PORT || 8000;


app.use(express.json())
app.use(cors())


//const formData = parse input.json
const formData = require('./input.json')

app.post('/test', (req, res) => {
    formData.push(req.body)
    console.log(formData)

    fs.writeFile ("input.json", JSON.stringify(formData, null, 2), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    )
    res.json({success: true})
})

app.get('/print', (req, res)=>{
    res.send(formData)
})

app.listen (port, ()=>{
    console.log(`Example app listening on ${port}`)
})