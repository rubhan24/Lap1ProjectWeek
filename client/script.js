//Character Count
const characterCount = document.querySelector('#journal-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#journal-entry').value.length

    }
}



let gifLink = '';

//Sending a POST request to the backend
const formEl = document.querySelector('form');
formEl.addEventListener('submit', postFormData)



let count=0;
async function postFormData(e) {

  
  const current= new Date().toLocaleString() 
  const formData= new FormData(formEl) // console.log this to check what format this is in 
  // console.log(formData)
  const formDataSerialised=Object.fromEntries(formData) //console.log this to see what this does

  // console.log('got ' + gifLink);
  const jsonObject = {...formDataSerialised, "dateTime": current, "comment": [], "EmojiCount": [0,0,0], "gifLink":gifLink, 'id':count}
  console.log(JSON.stringify(jsonObject, null, 2))
  try{
    const response = await fetch('http://localhost:8000/test', {
      method: 'POST', 
      body: JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    // console.log(json)
  }catch(e){
    console.error(e);
    alert('There was an error')
  }
}

 //Detching Data from the Backend and creating post
fetch('http://localhost:8000/print')
.then(resp =>  resp.json())
.then(resp=> {
  console.log(resp)
  createPost(resp)
})


function createPost(resp){
  resp.forEach(item => {
    // console.log(item)
    // let 
    count++
    console.log(item.comment)
    let postList = document.querySelector('#postHere')
    const eachPost = document.createElement('section')
    eachPost.innerHTML=
    `
      <div id="post">
        <div class="card-body">
            <h5 class="card-title">${item.journalTitle}</h5>
            <h7 class="card-title">${item.dateTime}</h7>
            <p class="card-text">${item.journalEntry}</p>
        </div>
        <div style="padding:0em 1em 1em 1em">  
            <img src="${item.gifLink}">
        </div>       
        <div class="container">
            <div class="row">
              <div class="col text-center">
                <button style="width:100%" type="button" onclick="counterIncrease('${item.id}', 'up')">&#128077; ${item.EmojiCount[0]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%" onclick="counterIncrease('${item.id}', 'down')">&#128078; ${item.EmojiCount[1]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%" onclick="counterIncrease('${item.id}', 'heart')">&#10084; ${item.EmojiCount[2]}</button>
              </div>
            </div>
        </div>  
        <div class="comments">
            <h2>Comments</h2>
            <div id="comment-box">
                <p>${item.comment}</p>
            </div>
        </div>
        <div class="container">
          <h2>Leave us a comment</h2>
          <form>
              <textarea id="${item.id}" placeholder="Add Your Comment" value=" " onfocus="appear(${item.journalTitle.split(" ").join("")})" onblur="clickAway(${item.journalTitle.split(" ").join("")})"></textarea>
              <div id="commentBtn">
                  <input id="submitComment" type="button" value="Comment" onclick="sendComment(${item.id})">
                  <button type="button" id="clear" onclick="clearCommentSection(${item.journalTitle.split(" ").join("")})">Cancel</button>
              </div> 
          </form>
        </div>
      </div>
`
postList.prepend(eachPost)
  }) 
}

// GIF SEARCH
function sendApiRequest() {
  let userInput = document.getElementById("gif-search").value
  console.log(userInput)

  const giphyApiKey = "4qsIN2L7YbHr9wkQfLXylyEPXoG0Z6nZ"
  const giphyApiURL = `http://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`

  fetch(giphyApiURL).then(function(data) {
      return data.json()
  })
  .then(function(json){
      const index = Math.floor(Math.random() * json.data.length)
      // console.log(json.data[index].images.fixed_height.url)
      let imgPath = json.data[index].images.fixed_height.url
      let gifImage=document.querySelector("#gifImage")
      // let img = document.createElement("img")
      gifImage.setAttribute("src", imgPath)
      gifLink = imgPath;
  })
}

// Emoji Counter
function counterIncrease(id,emoji){
  
  // console.log('got' + journaltitle + emoji)
  fetch('http://localhost:8000/emojiUpdate', {
    method: 'PUT',
    body: JSON.stringify({ id: id, emoji: emoji }),
    headers: { 'Content-Type': 'application/json' },
  })
}


// (frontend)
// make an onclick function for the emoji buttons that takes 2 params - the emocji licked and the journal title.
// 	in the on click, call the endpoint -->

// (backend)
// make a new endpoint that takes the emoji and journal title
// 	iterate through the database until you find the matching jornal title
// 	incrememnt the corresponding emoji







// COMMENT SECTION 

// const field = document.querySelector('#commentArea');
// // const backUp = field.getAttribute('placeholder')
// const btn = document.querySelector('#commentBtn')
// const clear = document.getElementById('clear')
// const submit = document.querySelector('#submitComment')
// // const comments = document.querySelector('#comment-box')
// const comments = document.getElementById('comment-box')

// let comments_arr = [];
// field.onfocus = function(){
//     this.setAttribute('placeholder','')
//     this.style.borderColor = '#333'
//     btn.style.display = 'block'
// } // when clicking on this, placeholder changes into ' ', border colour changes and buttons will appear.

// function appear(id){
//     id.setAttribute('placeholder','')
//     // this.style.borderColor = '#333'
//     // btn.style.display = 'block'
// }

// function clickAway(id){
//   let backUp="Add Your Comment";
//   id.setAttribute('placeholder',backUp)
// }

// function clearCommentSection(id){
//   console.log(id)
//     id.value=' '
//     id.setAttribute('placeholder',"Add Your Comment")
// }


//Front end
//When you click on the comment button, it calls a function that takes in a input of the title post. 
//The function takes the value in the text area and sends it to the backend 

//Backend 


function sendComment(id) {
  console.log(id)
  
  const textBoxValue= document.getElementById(`${id}`).value
  console.log(textBoxValue)
  // console.log(textBoxValue)
  // console.log(journalTitle)
  fetch('http://localhost:8000/comments', {
    method: 'PUT',
    body: JSON.stringify({ comment: textBoxValue, id: id}),
    headers: { 'Content-Type': 'application/json' },
  })
}






// const display_comments = () => {
//     let list = '<ul>'
//     comments_arr.forEach(comment => {
//         list += `<div>${comment}</div>`
//     })
//     list += '</ul>'
//     comments.innerHTML = list
// } // Creates a list of comments and appending to the comment box

// clear.onclick = function(e){
//     e.preventDefault();
//     btn.style.display = 'none';
//     field.value = ' '
//   
// } 

// submit.onclick = function(event){
//     event.preventDefault();
//     const content = field.value;
//     console.log(content)
//     if(content.length > 0){ // if there is content
//       // add the comment to the array
//       comments_arr.push(content);
// // re-genrate the comment html list
//       display_comments();
//       // reset the textArea content 
//       field.value = '';
//     }
// }
