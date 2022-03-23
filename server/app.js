const express = require ('express')
const cors = require('cors')
const fs = require('fs')
const app = express ()
const port = process.env.PORT || 8000;


app.use(express.json())
app.use(cors())

const writeToJson = () => {
    console.log('test')
    fs.writeFile ("input.json", JSON.stringify(formData, null, 2), function(err) {
        if (err) throw err;
        console.log('Added form data to array');
        }
    )
};

//const formData = parse input.json
const formData = require('./input.json')

app.post('/test', (req, res) => {
    formData.push(req.body)
    // console.log(formData)
    writeToJson();

    res.json({success: true})
})

app.put('/emojiUpdate', (req, res)=>{
   console.log(req.body.title)
//    console.log(req.body.emoji)
//    console.log(formData[0])
   const title = req.body.title;
   const matchingPost = formData.find(post=> post.journalTitle ===title )
//    console.log(matchingPost)
   if (req.body.emoji === 'up'){
        matchingPost.EmojiCount[0]++
   } else if(req.body.emoji === 'down'){
        matchingPost.EmojiCount[1]++
   } else if(req.body.emoji === 'heart'){
        matchingPost.EmojiCount[2]++
   }
   writeToJson();
})


app.get('/print', (req, res)=>{
    res.send(formData)
})

app.listen (port, ()=>{
    console.log(`Example app listening on ${port}`)
})