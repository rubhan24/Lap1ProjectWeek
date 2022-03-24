// ----------------------------- SETTING UP THE SERVER WITH EXPRESS --------------------------------
const express = require ('express')
const cors = require('cors')
const fs = require('fs')
const app = express ()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())


// ----------------------------- EVERYTIME THIS FUNCTION IS CALLED, IT CREATES AN INPUT.JSON WITH THE NEW AND UPDATED formData VARIABLE --------------------------------

const writeToJson = () => {
    console.log('test')
    fs.writeFile ("input.json", JSON.stringify(formData, null, 2), function(err) {
        if (err) throw err;
        console.log('Added form data to array');
        }
    )
};

// ----------------------------- REQUIRING THE OBJECT ARRAY FROM THE INPUT.JSON FILE --------------------------------

const formData = require('./input.json')

// ----------------------------- PUSHING THE FORM DATA FROM FRONTEND INTO FORMDATA VARIABLE AND WRITING THE FORMDATA VARIABLE BACK INTO input.json --------------------------------

app.post('/test', (req, res) => {
    formData.push(req.body)
    // console.log(formData)
    writeToJson();
    res.json({success: true})
})

// ----------------------------- EVERYTIME AN EMOJI BUTTON IS CLICKED IN THE FRONTEND, THIS INCREASES THE COUNT IN THE EmojiCount ARRAY IN the formData VARIABLE, AND THEN WRITES THE NEW FORMDATA INTO input.json using writeToJson --------------------------------

app.put('/emojiUpdate', (req, res)=>{
    // console.log(req.body)
    // console.log(req.body.emoji)
    // console.log(formData[0])
    const index = req.body.id;
    // console.log(index)
   const matchingPost = formData.find(post=> post.id === index )
    // console.log(matchingPost)
   if (req.body.emoji === 'up'){
        matchingPost.EmojiCount[0]++
   } else if(req.body.emoji === 'down'){
         matchingPost.EmojiCount[1]++
    } else if(req.body.emoji === 'heart'){
         matchingPost.EmojiCount[2]++
    }
    writeToJson();
})

// EVERYTIME THE COMMENT BUTTON IS PRESSED ON THE FRONTEND, THIS SENDS THE TEXTAREA VALUE AND THE DATETIME OF WHEN THE BTN WAS PRESSED TO THE BACKEND. IN THE BACKEND, THIS CREATES AN OBJECT WITH THAT INFO AND PUSHES IT INTO MATCHINGPOST OBJECT AND THEN WRITES IT INTO THE INPUT.JSON FILE USING writeToJson()

app.put('/comments', (req, res)=>{
    // console.log(req.body)
    // console.log(req.body.title)
    // console.log(req.body.comment)
    const index=req.body.id;
    const object={comment: req.body.comment, comDateTime:req.body.comDateTime}
    const matchingPost = formData.find(post=> post.id===index)
    matchingPost.comment.push(object)
    // console.log(matchingPost)
    writeToJson()
})

// ----------------------------- THIS PRINTS WHAT IS IN THE INPUT.JSON FILE --------------------------------

app.get('/print', (req, res)=>{
    res.send(formData)
})

// ----------------------------- THIS LISTENS TO REQUESTS --------------------------------

app.listen (port, ()=>{
    console.log(`Example app listening on ${port}`)
})