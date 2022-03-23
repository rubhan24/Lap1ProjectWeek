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

async function postFormData(e) {

  const current= new Date().toLocaleString() 
  const formData= new FormData(formEl) // console.log this to check what format this is in 
  // console.log(formData)
  const formDataSerialised=Object.fromEntries(formData) //console.log this to see what this does

  // console.log('got ' + gifLink);
  const jsonObject = {...formDataSerialised, "dateTime": current, "comment": "", "EmojiCount": [0,0,0], "gifLink":gifLink}
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

let postList = document.querySelector('#post')

function createPost(resp){
  resp.forEach(item => {
    // console.log(item)
    // let 
    const div = document.createElement('div')
    div.innerHTML=
    `<section class="padding">
    <div>
        <div class="card-body">
            <h5 class="card-title">${item.journalTitle}</h5>
            <p class="card-text">${item.journalEntry}</p>
        </div>
        <div style="padding:0em 1em 1em 1em">  
            <img src="${item.gifLink}">
        </div>       
        <div class="container">
            <div class="row">
              <div class="col text-center">
                <button style="width:100%" onclick="counterIncrease('${item.journalTitle}', 'up')">&#128077; ${item.EmojiCount[0]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%" onclick="counterIncrease('${item.journalTitle}', 'down')">&#128078; ${item.EmojiCount[1]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%" onclick="counterIncrease('${item.journalTitle}', 'heart')">&#10084; ${item.EmojiCount[2]}</button>
              </div>
            </div>
          </div>  
          <div class="comments">
                <h2>Comments</h2>
                <div id="comment-box">
                </div>
            </div>
            <div class="container">
              <h2>Leave us a comment</h2>
              <form>
                 <textarea id="commentArea" placeholder="Add Your Comment" value=" "></textarea>
                 <div id="commentBtn">
                     <input id="submitComment" type="button" value="Comment">
                     <button id="clear">  
                      Cancel</button>
                 </div> 
              </form>
          </div>
          </div>
</section>`
postList.prepend(div)
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
      imgPath = json.data[index].images.fixed_height.url
      let gifImage=document.querySelector("#gifImage")
      // let img = document.createElement("img")
      gifImage.setAttribute("src", imgPath)
      gifLink = imgPath;
  })

}

// Emoji Counter
function counterIncrease(journaltitle,emoji){
  
  // console.log('got' + journaltitle + emoji)
  fetch('http://localhost:8000/emojiUpdate', {
    method: 'PUT',
    body: JSON.stringify({ title: journaltitle, emoji: emoji }),
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

const field = document.querySelector('#commentArea');
const backUp = field.getAttribute('placeholder')
const btn = document.querySelector('#commentBtn')
const clear = document.getElementById('clear')
const submit = document.querySelector('#submitComment')
// const comments = document.querySelector('#comment-box')
const comments = document.getElementById('comment-box')

let comments_arr = [];
field.onfocus = function(){
    this.setAttribute('placeholder','')
    this.style.borderColor = '#333'
    btn.style.display = 'block'
} // when clicking on this, placeholder changes into ' ', border colour changes and buttons will appear.

field.onblur = function(){
    this.setAttribute('placeholder',backUp)
} //click away, placeholder returns


const display_comments = () => {
    let list = '<ul>'
    comments_arr.forEach(comment => {
        list += `<div>${comment}</div>`
    })
    list += '</ul>'
    comments.innerHTML = list
} // Creates a list of comments and appending to the comment box

clear.onclick = function(e){
    e.preventDefault();
    btn.style.display = 'none';
    field.value = ' '
    // comments_arr.length = 0;
    display_comments()
} 

submit.onclick = function(event){
    event.preventDefault();
    const content = field.value;
    if(content.length > 0){ // if there is content
      // add the comment to the array
      comments_arr.push(content);
// re-genrate the comment html list
      display_comments();
      // reset the textArea content 
      field.value = '';
    }
}
